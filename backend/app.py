#!/usr/bin/env python3
"""
Codeword Backend - Crisis support and life coaching API
Connects to OpenAI GPT-4o for real AI responses
"""
import os
import time
import json
from datetime import datetime
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from openai import OpenAI
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# OpenAI Configuration
api_key = os.getenv('OPENAI_API_KEY')
if api_key:
    try:
        openai_client = OpenAI(api_key=api_key)
        logger.info("OpenAI client initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize OpenAI client: {e}")
        openai_client = None
else:
    logger.error("OPENAI_API_KEY environment variable not set")
    openai_client = None

# Store sessions in memory (use Redis/DB in production)
sessions = {}

class CodewordBackend:
    def __init__(self):
        self.start_time = time.time()
        self.version = "2.0.0"
        
    def get_uptime(self):
        return time.time() - self.start_time

backend = CodewordBackend()

@app.route('/', methods=['GET'])
def root():
    return jsonify({
        "message": "Crisis support and life coaching API",
        "service": "Codeword Backend", 
        "status": "online"
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "service": "codeword-backend",
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "uptime": backend.get_uptime(),
        "version": backend.version
    })

@app.route('/api/session', methods=['POST'])
def create_session():
    try:
        data = request.get_json()
        device_id = data.get('device_id', f'device-{int(time.time())}')
        
        session_id = f'session-{int(time.time())}-{device_id}'
        
        sessions[session_id] = {
            'session_id': session_id,
            'device_id': device_id,
            'created_at': time.time(),
            'messages': []
        }
        
        logger.info(f"Created session: {session_id}")
        
        return jsonify({
            'session_id': session_id,
            'device_id': device_id,
            'status': 'created'
        })
        
    except Exception as e:
        logger.error(f"Session creation error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        session_id = data.get('session_id', 'default')
        message = data.get('message', '')
        stream = data.get('stream', False)
        
        if not message.strip():
            return jsonify({'error': 'Message cannot be empty'}), 400
            
        logger.info(f"Chat request - Session: {session_id}, Message: {message[:50]}...")
        
        # Ensure session exists
        if session_id not in sessions:
            sessions[session_id] = {
                'session_id': session_id,
                'device_id': 'unknown',
                'created_at': time.time(),
                'messages': []
            }
        
        # Add user message to history
        sessions[session_id]['messages'].append({
            'role': 'user',
            'content': message,
            'timestamp': time.time()
        })
        
        # Check if OpenAI is configured
        if not openai_client:
            return jsonify({
                'response': 'Echo: ' + message,
                'timestamp': datetime.utcnow().isoformat(),
                'error': 'OpenAI API key not configured'
            })
        
        # Build conversation history for OpenAI
        conversation = []
        
        # Crisis detection keywords (MIKA-inspired)
        crisis_keywords = {
            'critical': ['kill myself', 'suicide', 'end my life', 'want to die', 'overdose', 'heart attack', 'stroke'],
            'high': ['hurt myself', 'self harm', 'cut myself', 'want to hurt'],
            'moderate': ['hopeless', 'worthless', 'give up', 'no point', 'nobody cares'],
            'low': ['sad', 'depressed', 'anxious', 'overwhelmed', 'stressed']
        }
        
        # Simple crisis detection
        message_lower = message.lower()
        crisis_level = 'none'
        for level, keywords in crisis_keywords.items():
            if any(keyword in message_lower for keyword in keywords):
                crisis_level = level
                break
        
        # Enhanced system prompt with crisis awareness
        system_content = '''You are a supportive AI coach for the Codeword app, designed to provide emotional support and crisis intervention. You are:

- Empathetic, caring, and non-judgmental
- Trained to detect signs of crisis or mental health concerns
- Focused on providing immediate emotional support
- Able to suggest coping strategies and resources
- Professional but warm in tone

CRISIS PROTOCOL: If you detect signs of self-harm, suicide ideation, or immediate danger:
1. Express immediate concern and validation
2. Encourage contacting 988 Suicide & Crisis Lifeline (call or text 988)
3. Suggest emergency services (911) if immediate physical danger
4. Provide Crisis Text Line (text HOME to 741741) as alternative
5. Emphasize that help is available and they matter

Current message crisis level detected: ''' + crisis_level + '''

Respond naturally and supportively to help the user through their situation.'''
        
        conversation.append({
            'role': 'system',
            'content': system_content
        })
        
        # Add recent conversation history (last 10 messages)
        recent_messages = sessions[session_id]['messages'][-10:]
        for msg in recent_messages:
            conversation.append({
                'role': msg['role'],
                'content': msg['content']
            })
        
        try:
            # Call OpenAI GPT-4o
            response = openai_client.chat.completions.create(
                model="gpt-4o",
                messages=conversation,
                max_tokens=500,
                temperature=0.7,
                stream=stream
            )
            
            if stream:
                def generate():
                    full_response = ""
                    for chunk in response:
                        if chunk.choices[0].delta.content:
                            content = chunk.choices[0].delta.content
                            full_response += content
                            yield f"data: {json.dumps({'content': content, 'done': False})}\n\n"
                    
                    # Add assistant message to history
                    sessions[session_id]['messages'].append({
                        'role': 'assistant',
                        'content': full_response,
                        'timestamp': time.time()
                    })
                    
                    yield f"data: {json.dumps({'content': '', 'done': True})}\n\n"
                
                return Response(generate(), mimetype='text/plain')
            else:
                ai_response = response.choices[0].message.content
                
                # Add assistant message to history
                sessions[session_id]['messages'].append({
                    'role': 'assistant',
                    'content': ai_response,
                    'timestamp': time.time()
                })
                
                logger.info(f"OpenAI response: {ai_response[:100]}...")
                
                return jsonify({
                    'response': ai_response,
                    'timestamp': datetime.utcnow().isoformat(),
                    'session_id': session_id,
                    'message_count': len(sessions[session_id]['messages']),
                    'crisis_level': crisis_level,
                    'crisis_support': {
                        '988_lifeline': 'Call or text 988 for immediate crisis support',
                        'crisis_text': 'Text HOME to 741741 for Crisis Text Line',
                        'emergency': 'Call 911 for immediate physical danger'
                    } if crisis_level in ['critical', 'high'] else None
                })
                
        except Exception as openai_error:
            logger.error(f"OpenAI API error: {openai_error}")
            
            # Fallback to echo if OpenAI fails
            fallback_response = f"I'm having trouble connecting to my AI service right now. Let me echo back what you said: {message}"
            
            sessions[session_id]['messages'].append({
                'role': 'assistant',
                'content': fallback_response,
                'timestamp': time.time()
            })
            
            return jsonify({
                'response': fallback_response,
                'timestamp': datetime.utcnow().isoformat(),
                'error': f'OpenAI error: {str(openai_error)}'
            })
            
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/healthz', methods=['GET'])
def healthz():
    """Health check endpoint that includes OpenAI status"""
    openai_status = "configured" if openai_client else "missing_api_key"
    
    return jsonify({
        "status": "healthy",
        "models_available": {
            "gpt-4o": openai_status,
            "primary": "gpt-4o"
        },
        "orchestration_status": "active",
        "timestamp": datetime.utcnow().isoformat()
    })

@app.route('/events/<session_id>', methods=['GET'])
def get_events(session_id):
    """Get session events for debugging"""
    if session_id not in sessions:
        return jsonify({'error': 'Session not found'}), 404
        
    return jsonify({
        'events': sessions[session_id]['messages'],
        'session_info': {
            'session_id': session_id,
            'created_at': sessions[session_id]['created_at'],
            'message_count': len(sessions[session_id]['messages'])
        }
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 9989))
    debug = os.getenv('DEBUG', 'false').lower() == 'true'
    
    logger.info(f"Starting Codeword Backend v{backend.version}")
    logger.info(f"OpenAI configured: {bool(openai_client)}")
    logger.info(f"Running on port: {port}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)