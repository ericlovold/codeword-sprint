#!/usr/bin/env python3
"""
Codeword Backend - Crisis support and life coaching API
Powered by XCAi-AIIA Multi-Agent System
Connects to OpenAI GPT-4o for real AI responses
"""
import os
import time
import json
import asyncio
from datetime import datetime
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from openai import OpenAI
import logging

# Import XCAi-AIIA Multi-Agent System
from xcai_agents import initialize_xcai_system

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

# Initialize XCAi-AIIA Multi-Agent System
try:
    xcai_orchestrator = initialize_xcai_system(openai_client=openai_client)
    logger.info("XCAi-AIIA Multi-Agent System initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize XCAi-AIIA system: {e}")
    xcai_orchestrator = None

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
            
        logger.info(f"XCAi-AIIA Chat request - Session: {session_id}, Message: {message[:50]}...")
        
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
        
        # Prepare request data for XCAi-AIIA orchestrator
        request_data = {
            'message': message,
            'session_id': session_id,
            'conversation_history': sessions[session_id]['messages'],
            'timestamp': datetime.utcnow().isoformat(),
            'user_context': data.get('user_context', {})
        }
        
        # Check if XCAi-AIIA system is available
        if not xcai_orchestrator:
            # Fallback to simple crisis detection
            crisis_keywords = ['crisis', 'suicide', 'kill myself', 'hurt myself', 'hopeless']
            is_crisis = any(keyword in message.lower() for keyword in crisis_keywords)
            
            fallback_response = (
                "I'm here to help. The multi-agent system is currently unavailable, "
                "but I want you to know that support is available. "
                "If you're in crisis, please call 988 or text HOME to 741741."
            ) if is_crisis else f"Echo: {message}"
            
            sessions[session_id]['messages'].append({
                'role': 'assistant',
                'content': fallback_response,
                'timestamp': time.time()
            })
            
            return jsonify({
                'response': fallback_response,
                'timestamp': datetime.utcnow().isoformat(),
                'session_id': session_id,
                'system': 'fallback',
                'error': 'XCAi-AIIA system unavailable'
            })
        
        try:
            # Quick crisis detection for immediate crisis mode activation
            crisis_indicators = ['suicide', 'kill myself', 'end my life', 'overdose', 'emergency']
            crisis_mode = any(indicator in message.lower() for indicator in crisis_indicators)
            
            # Use async orchestration with event loop
            if hasattr(asyncio, 'run'):
                # Python 3.7+
                orchestration_result = asyncio.run(
                    xcai_orchestrator.orchestrate_request(request_data, crisis_mode=crisis_mode)
                )
            else:
                # Fallback for older Python versions
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                try:
                    orchestration_result = loop.run_until_complete(
                        xcai_orchestrator.orchestrate_request(request_data, crisis_mode=crisis_mode)
                    )
                finally:
                    loop.close()
            
            ai_response = orchestration_result['response']
            
            # Add assistant message to history
            sessions[session_id]['messages'].append({
                'role': 'assistant',
                'content': ai_response,
                'timestamp': time.time()
            })
            
            logger.info(f"XCAi-AIIA response ({orchestration_result['response_time_ms']:.1f}ms): {ai_response[:100]}...")
            
            return jsonify({
                'response': ai_response,
                'timestamp': datetime.utcnow().isoformat(),
                'session_id': session_id,
                'message_count': len(sessions[session_id]['messages']),
                'system': 'xcai-aiia',
                'agents_used': orchestration_result.get('agents_used', []),
                'response_time_ms': orchestration_result.get('response_time_ms', 0),
                'crisis_mode': orchestration_result.get('crisis_mode', False),
                'crisis_support': {
                    '988_lifeline': 'Call or text 988 for immediate crisis support',
                    'crisis_text': 'Text HOME to 741741 for Crisis Text Line',
                    'emergency': 'Call 911 for immediate physical danger'
                } if crisis_mode else None
            })
                
        except Exception as xcai_error:
            logger.error(f"XCAi-AIIA orchestration error: {xcai_error}")
            
            # Fallback response with crisis awareness
            fallback_response = (
                "I'm experiencing a technical issue with the AI system, but your safety is my priority. "
                "If you're in crisis, please call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 immediately. "
                f"In the meantime, I hear you saying: {message}"
            )
            
            sessions[session_id]['messages'].append({
                'role': 'assistant',
                'content': fallback_response,
                'timestamp': time.time()
            })
            
            return jsonify({
                'response': fallback_response,
                'timestamp': datetime.utcnow().isoformat(),
                'session_id': session_id,
                'system': 'fallback',
                'error': f'XCAi-AIIA error: {str(xcai_error)}'
            })
            
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/healthz', methods=['GET'])
def healthz():
    """Health check endpoint that includes OpenAI and XCAi-AIIA status"""
    openai_status = "configured" if openai_client else "missing_api_key"
    xcai_status = "active" if xcai_orchestrator else "unavailable"
    
    health_data = {
        "status": "healthy",
        "models_available": {
            "gpt-4o": openai_status,
            "primary": "gpt-4o"
        },
        "xcai_aiia_system": {
            "status": xcai_status,
            "orchestrator": "active" if xcai_orchestrator else "inactive"
        },
        "timestamp": datetime.utcnow().isoformat()
    }
    
    # Add XCAi-AIIA system health if available
    if xcai_orchestrator:
        try:
            system_health = xcai_orchestrator.get_system_health()
            health_data["xcai_aiia_system"]["agents"] = system_health.get("agents", {})
            health_data["xcai_aiia_system"]["performance"] = system_health.get("performance", {})
        except Exception as e:
            logger.warning(f"Could not get XCAi-AIIA system health: {e}")
    
    return jsonify(health_data)

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