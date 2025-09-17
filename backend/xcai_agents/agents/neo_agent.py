#!/usr/bin/env python3
"""
NEO Agent - Primary Emotional Intelligence Processor
Core Functions: Emotional analysis, response generation, context building
Crisis Handling: Real-time crisis detection with confidence scoring
Integration: OpenAI API for advanced language processing
Response Time: < 50ms standard, < 5ms crisis mode
"""
import time
import re
from typing import Dict, Any, List, Tuple
from datetime import datetime
import logging

from ..core.base_agent import SpecializedAgent

logger = logging.getLogger(__name__)

class NEOAgent(SpecializedAgent):
    """
    NEO Agent - Primary emotional intelligence and response generation
    Fibonacci Level: 1 (Primary Agent)
    """
    
    def __init__(self, openai_client=None):
        super().__init__(
            agent_name="NEO",
            specialization="Emotional Intelligence & Response Generation",
            agent_version="1.0.0"
        )
        
        # Agent configuration
        self.crisis_capable = True
        self.response_time_target = 50  # ms standard, 5ms crisis
        self.capabilities = [
            "emotional_analysis",
            "response_generation", 
            "crisis_detection",
            "context_building",
            "confidence_scoring"
        ]
        
        # OpenAI integration
        self.openai_client = openai_client
        
        # Emotional analysis patterns
        self.emotion_patterns = {
            'anxiety': ['anxious', 'worried', 'nervous', 'stressed', 'panic', 'overwhelmed'],
            'depression': ['depressed', 'sad', 'hopeless', 'empty', 'worthless', 'numb'],
            'anger': ['angry', 'furious', 'rage', 'frustrated', 'mad', 'irritated'],
            'fear': ['scared', 'afraid', 'terrified', 'frightened', 'fearful'],
            'joy': ['happy', 'joyful', 'excited', 'elated', 'thrilled', 'glad'],
            'love': ['love', 'caring', 'affection', 'warmth', 'connection'],
            'shame': ['ashamed', 'guilty', 'embarrassed', 'humiliated'],
            'grief': ['grieving', 'mourning', 'loss', 'bereaved', 'heartbroken']
        }
        
        # Crisis detection patterns (enhanced from MIKA integration)
        self.crisis_patterns = {
            'critical': {
                'patterns': ['kill myself', 'suicide', 'end my life', 'want to die', 'overdose'],
                'confidence': 0.95,
                'priority': 1
            },
            'high': {
                'patterns': ['hurt myself', 'self harm', 'cut myself', 'want to hurt', 'harm to others'],
                'confidence': 0.85,
                'priority': 2
            },
            'moderate': {
                'patterns': ['hopeless', 'worthless', 'give up', 'no point', 'nobody cares'],
                'confidence': 0.70,
                'priority': 3
            },
            'low': {
                'patterns': ['sad', 'depressed', 'anxious', 'overwhelmed', 'stressed'],
                'confidence': 0.50,
                'priority': 4
            }
        }
        
        logger.info("NEO Agent initialized with emotional intelligence and crisis detection")
    
    def process(self, request_data: Dict[str, Any]) -> str:
        """Process request with emotional intelligence and response generation"""
        start_time = time.time()
        
        try:
            # Validate input
            if not self._validate_input(request_data):
                return "I'd like to help you. Could you please share what's on your mind?"
            
            # Extract context
            context = self._extract_context(request_data)
            message = context['message']
            
            # Emotional analysis
            emotional_state = self._analyze_emotions(message)
            
            # Crisis detection
            crisis_assessment = self._detect_crisis(message)
            
            # Context building
            enhanced_context = self._build_context(context, emotional_state, crisis_assessment)
            
            # Generate response
            if crisis_assessment['level'] in ['critical', 'high']:
                self.set_processing_mode('crisis')
                response = self._generate_crisis_response(enhanced_context)
            else:
                self.set_processing_mode('standard')
                response = self._generate_emotional_response(enhanced_context)
            
            # Record performance
            response_time = time.time() - start_time
            self._record_request(response_time, True)
            
            return response
            
        except Exception as e:
            response_time = time.time() - start_time
            self._record_request(response_time, False)
            return self._handle_error(e, request_data)
    
    def _analyze_emotions(self, message: str) -> Dict[str, Any]:
        """Analyze emotional content of the message"""
        message_lower = message.lower()
        detected_emotions = {}
        primary_emotion = 'neutral'
        intensity = 0.0
        
        # Pattern matching for emotions
        for emotion, patterns in self.emotion_patterns.items():
            matches = [pattern for pattern in patterns if pattern in message_lower]
            if matches:
                confidence = len(matches) / len(patterns)
                detected_emotions[emotion] = {
                    'confidence': confidence,
                    'matches': matches
                }
                
                # Update primary emotion if this has higher confidence
                if confidence > intensity:
                    intensity = confidence
                    primary_emotion = emotion
        
        # Emotional intensity analysis
        intensity_indicators = ['very', 'extremely', 'really', 'so', 'quite', 'totally']
        intensity_boost = sum(1 for indicator in intensity_indicators if indicator in message_lower) * 0.1
        intensity = min(1.0, intensity + intensity_boost)
        
        return {
            'primary_emotion': primary_emotion,
            'intensity': intensity,
            'detected_emotions': detected_emotions,
            'emotional_complexity': len(detected_emotions)
        }
    
    def _detect_crisis(self, message: str) -> Dict[str, Any]:
        """Enhanced crisis detection with confidence scoring"""
        message_lower = message.lower()
        
        for level, config in self.crisis_patterns.items():
            for pattern in config['patterns']:
                if pattern in message_lower:
                    return {
                        'level': level,
                        'confidence': config['confidence'],
                        'priority': config['priority'],
                        'detected_pattern': pattern,
                        'requires_immediate_response': level in ['critical', 'high']
                    }
        
        return {
            'level': 'none',
            'confidence': 0.0,
            'priority': 5,
            'detected_pattern': None,
            'requires_immediate_response': False
        }
    
    def _build_context(self, base_context: Dict[str, Any], emotional_state: Dict[str, Any], 
                      crisis_assessment: Dict[str, Any]) -> Dict[str, Any]:
        """Build enhanced context for response generation"""
        return {
            **base_context,
            'emotional_analysis': emotional_state,
            'crisis_assessment': crisis_assessment,
            'neo_insights': {
                'emotional_priority': emotional_state['primary_emotion'],
                'response_urgency': 'immediate' if crisis_assessment['requires_immediate_response'] else 'standard',
                'support_level': self._determine_support_level(emotional_state, crisis_assessment),
                'conversation_tone': self._determine_tone(emotional_state, crisis_assessment)
            }
        }
    
    def _determine_support_level(self, emotional_state: Dict[str, Any], 
                                crisis_assessment: Dict[str, Any]) -> str:
        """Determine appropriate level of support response"""
        if crisis_assessment['level'] in ['critical', 'high']:
            return 'crisis_intervention'
        elif emotional_state['intensity'] > 0.7:
            return 'intensive_support'
        elif emotional_state['primary_emotion'] in ['depression', 'anxiety', 'grief']:
            return 'therapeutic_support'
        else:
            return 'general_support'
    
    def _determine_tone(self, emotional_state: Dict[str, Any], 
                       crisis_assessment: Dict[str, Any]) -> str:
        """Determine appropriate conversational tone"""
        if crisis_assessment['level'] in ['critical', 'high']:
            return 'urgent_caring'
        elif emotional_state['primary_emotion'] in ['grief', 'depression']:
            return 'gentle_compassionate'
        elif emotional_state['primary_emotion'] in ['anger', 'frustration']:
            return 'calm_validating'
        elif emotional_state['primary_emotion'] in ['anxiety', 'fear']:
            return 'reassuring_grounding'
        else:
            return 'warm_supportive'
    
    def _generate_crisis_response(self, context: Dict[str, Any]) -> str:
        """Generate immediate crisis response (< 5ms target)"""
        crisis_level = context['crisis_assessment']['level']
        emotion = context['emotional_analysis']['primary_emotion']
        
        # Immediate crisis templates for speed
        if crisis_level == 'critical':
            return (
                "I'm very concerned about what you've shared. Your life has value and there are people who want to help. "
                "Please reach out immediately:\n"
                "• Call or text 988 (Suicide & Crisis Lifeline)\n"
                "• Call 911 if you're in immediate danger\n"
                "• Text HOME to 741741 (Crisis Text Line)\n\n"
                "You don't have to go through this alone. Help is available right now."
            )
        elif crisis_level == 'high':
            return (
                "I hear that you're in significant pain right now. What you're feeling is valid, and there are people trained to help. "
                "Please consider reaching out:\n"
                "• Call or text 988 for immediate support\n"
                "• Text HOME to 741741 for Crisis Text Line\n\n"
                "You matter, and there are ways through this difficult time."
            )
        else:
            # Use AI generation for moderate/low crisis
            return self._generate_ai_response(context)
    
    def _generate_emotional_response(self, context: Dict[str, Any]) -> str:
        """Generate emotionally-aware response using AI"""
        return self._generate_ai_response(context)
    
    def _generate_ai_response(self, context: Dict[str, Any]) -> str:
        """Generate AI response with enhanced context"""
        if not self.openai_client:
            return self._generate_fallback_response(context)
        
        try:
            # Build enhanced system prompt
            system_prompt = self._build_system_prompt(context)
            
            # Prepare conversation
            conversation = [{'role': 'system', 'content': system_prompt}]
            
            # Add conversation history if available
            history = context.get('conversation_history', [])
            if history:
                conversation.extend(history[-5:])  # Last 5 messages for context
            
            # Add current message
            conversation.append({'role': 'user', 'content': context['message']})
            
            # Generate response
            response = self.openai_client.chat.completions.create(
                model="gpt-4o",
                messages=conversation,
                max_tokens=400,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            logger.error(f"NEO AI generation failed: {e}")
            return self._generate_fallback_response(context)
    
    def _build_system_prompt(self, context: Dict[str, Any]) -> str:
        """Build enhanced system prompt with emotional and crisis context"""
        emotional_state = context['emotional_analysis']
        crisis_state = context['crisis_assessment']
        neo_insights = context['neo_insights']
        
        base_prompt = (
            "You are NEO, the primary emotional intelligence agent in the XCAi-AIIA system for Codeword. "
            "You provide empathetic, professional crisis support and life coaching.\n\n"
        )
        
        # Add emotional context
        if emotional_state['primary_emotion'] != 'neutral':
            base_prompt += (
                f"EMOTIONAL CONTEXT:\n"
                f"- Primary emotion detected: {emotional_state['primary_emotion']}\n"
                f"- Emotional intensity: {emotional_state['intensity']:.2f}\n"
                f"- Support level needed: {neo_insights['support_level']}\n"
                f"- Recommended tone: {neo_insights['conversation_tone']}\n\n"
            )
        
        # Add crisis context
        if crisis_state['level'] != 'none':
            base_prompt += (
                f"CRISIS ASSESSMENT:\n"
                f"- Crisis level: {crisis_state['level']}\n"
                f"- Confidence: {crisis_state['confidence']:.2f}\n"
                f"- Requires immediate response: {crisis_state['requires_immediate_response']}\n\n"
            )
            
            if crisis_state['level'] in ['moderate', 'low']:
                base_prompt += (
                    "CRISIS RESPONSE GUIDANCE:\n"
                    "- Validate their feelings and express concern\n"
                    "- Suggest 988 Suicide & Crisis Lifeline (call/text 988)\n"
                    "- Provide Crisis Text Line (text HOME to 741741)\n"
                    "- Emphasize that help is available and they matter\n\n"
                )
        
        base_prompt += (
            "RESPONSE GUIDELINES:\n"
            "- Be empathetic, warm, and non-judgmental\n"
            "- Validate their feelings and experiences\n"
            "- Provide practical coping strategies when appropriate\n"
            "- Maintain professional boundaries\n"
            "- Focus on their strengths and resilience\n"
            "- Encourage professional help when needed\n\n"
            "Respond naturally and supportively to help them through their situation."
        )
        
        return base_prompt
    
    def _generate_fallback_response(self, context: Dict[str, Any]) -> str:
        """Generate fallback response when AI is unavailable"""
        emotion = context['emotional_analysis']['primary_emotion']
        crisis_level = context['crisis_assessment']['level']
        
        if crisis_level in ['moderate', 'low']:
            return (
                "I hear that you're going through a difficult time right now. "
                "Your feelings are valid, and it's okay to reach out for support. "
                "If you need immediate help, please call or text 988 for the Suicide & Crisis Lifeline, "
                "or text HOME to 741741 for the Crisis Text Line. "
                "You don't have to face this alone - there are people who care and want to help."
            )
        elif emotion in ['depression', 'grief']:
            return (
                "I can sense that you're carrying some heavy feelings right now. "
                "It takes courage to reach out, and I'm glad you're here. "
                "Would you like to talk about what's weighing on your mind?"
            )
        elif emotion in ['anxiety', 'fear']:
            return (
                "It sounds like you're feeling anxious or worried about something. "
                "Those feelings can be really overwhelming. Take a deep breath with me - "
                "you're safe right now, and we can work through this together."
            )
        else:
            return (
                "Thank you for sharing with me. I'm here to listen and support you. "
                "What would be most helpful for you right now?"
            )
    
    def calculate_confidence(self, request_data: Dict[str, Any]) -> float:
        """Calculate confidence for handling this request"""
        message = request_data.get('message', '').lower()
        
        # High confidence for emotional and crisis content
        emotional_indicators = ['feel', 'emotion', 'sad', 'happy', 'angry', 'scared', 'worried']
        crisis_indicators = ['help', 'crisis', 'desperate', 'hopeless', 'suicide', 'harm']
        
        emotional_score = sum(1 for indicator in emotional_indicators if indicator in message)
        crisis_score = sum(1 for indicator in crisis_indicators if indicator in message)
        
        # NEO is the primary agent, so it has high confidence for most requests
        base_confidence = 0.8
        emotional_boost = min(0.15, emotional_score * 0.05)
        crisis_boost = min(0.05, crisis_score * 0.02)
        
        return min(1.0, base_confidence + emotional_boost + crisis_boost)