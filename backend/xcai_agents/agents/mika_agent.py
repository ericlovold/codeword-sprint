#!/usr/bin/env python3
"""
MIKA Agent - Crisis Intervention Specialist
Core Functions: Crisis detection, risk assessment, intervention recommendations
Crisis Types: Suicidal ideation, self-harm, harm to others, substance abuse, acute distress, medical emergencies
Risk Levels: 5-tier system (None → Low → Moderate → High → Critical)
Integration: 988 Suicide & Crisis Lifeline, emergency protocols
Response Time: < 1ms for crisis detection
"""
import time
import re
from typing import Dict, Any, List, Tuple
from datetime import datetime
import logging

from ..core.base_agent import SpecializedAgent

logger = logging.getLogger(__name__)

class MIKAAgent(SpecializedAgent):
    """
    MIKA Agent - Crisis Intervention and Risk Assessment
    Fibonacci Level: 5 (Crisis Specialist)
    """
    
    def __init__(self):
        super().__init__(
            agent_name="MIKA",
            specialization="Crisis Intervention & Risk Assessment",
            agent_version="1.0.0"
        )
        
        # Agent configuration
        self.crisis_capable = True
        self.response_time_target = 1  # < 1ms for crisis detection
        self.capabilities = [
            "crisis_detection",
            "risk_assessment", 
            "intervention_protocols",
            "emergency_escalation",
            "safety_planning",
            "resource_coordination"
        ]
        
        # Enhanced crisis detection patterns
        self.crisis_patterns = {
            'critical': {
                'suicide': [
                    'kill myself', 'suicide', 'end my life', 'want to die', 'take my own life',
                    'not worth living', 'better off dead', 'end it all', 'ready to die'
                ],
                'immediate_harm': [
                    'overdose', 'pills to end', 'going to hurt myself', 'cutting deeper',
                    'jump off', 'hanging myself', 'gun to my head'
                ],
                'medical_emergency': [
                    'heart attack', 'stroke', 'can\'t breathe', 'bleeding heavily',
                    'unconscious', 'overdosed', 'poisoned'
                ],
                'harm_others': [
                    'kill them', 'hurt everyone', 'revenge on others', 'make them pay',
                    'violent thoughts about'
                ],
                'confidence': 0.95,
                'response_time': 0.001,  # 1ms
                'escalation': 'immediate_emergency'
            },
            'high': {
                'self_harm': [
                    'hurt myself', 'self harm', 'cut myself', 'want to hurt',
                    'harm my body', 'punish myself', 'cutting again'
                ],
                'substance_crisis': [
                    'too many pills', 'drinking to forget', 'using to escape',
                    'overdosing', 'substance to cope'
                ],
                'severe_ideation': [
                    'thinking about death', 'planning to hurt', 'ways to end',
                    'researching suicide', 'goodbye messages'
                ],
                'confidence': 0.85,
                'response_time': 0.002,  # 2ms
                'escalation': 'crisis_intervention'
            },
            'moderate': {
                'psychological_distress': [
                    'hopeless', 'worthless', 'give up', 'no point', 'nobody cares',
                    'can\'t go on', 'trapped', 'desperate', 'breaking down'
                ],
                'crisis_indicators': [
                    'in crisis', 'emergency help', 'need immediate help',
                    'can\'t handle this', 'falling apart'
                ],
                'isolation': [
                    'all alone', 'no one understands', 'abandoned', 'isolated',
                    'disconnected from everyone'
                ],
                'confidence': 0.70,
                'response_time': 0.005,  # 5ms
                'escalation': 'crisis_support'
            },
            'low': {
                'emotional_distress': [
                    'sad', 'depressed', 'anxious', 'overwhelmed', 'stressed',
                    'struggling', 'difficult time', 'hard to cope'
                ],
                'support_seeking': [
                    'need help', 'feeling lost', 'don\'t know what to do',
                    'scared', 'worried', 'confused'
                ],
                'confidence': 0.50,
                'response_time': 0.010,  # 10ms
                'escalation': 'supportive_response'
            }
        }
        
        # Emergency resources
        self.emergency_resources = {
            'critical': {
                'primary': '911 (Emergency Services)',
                'crisis': '988 (Suicide & Crisis Lifeline)',
                'text': 'Text HOME to 741741 (Crisis Text Line)',
                'message': 'IMMEDIATE EMERGENCY - Contact emergency services now'
            },
            'high': {
                'primary': '988 (Suicide & Crisis Lifeline)',
                'crisis': 'Text HOME to 741741 (Crisis Text Line)',
                'backup': '911 if immediate danger',
                'message': 'CRISIS INTERVENTION NEEDED - Professional help required immediately'
            },
            'moderate': {
                'primary': 'Text HOME to 741741 (Crisis Text Line)',
                'crisis': '988 (Suicide & Crisis Lifeline)',
                'support': '1-800-662-HELP (SAMHSA Helpline)',
                'message': 'CRISIS SUPPORT RECOMMENDED - Multiple resources available'
            },
            'low': {
                'primary': '1-800-662-HELP (SAMHSA Helpline)',
                'mental_health': 'Contact local mental health services',
                'support': 'Reach out to trusted friends/family',
                'message': 'SUPPORTIVE RESOURCES - Consider professional support'
            }
        }
        
        # Risk factors for enhanced assessment
        self.risk_factors = {
            'demographic': ['young', 'elderly', 'male', 'isolated'],
            'psychological': ['depression', 'anxiety', 'ptsd', 'bipolar', 'psychosis'],
            'situational': ['loss', 'divorce', 'job loss', 'financial stress', 'legal problems'],
            'behavioral': ['substance use', 'previous attempts', 'impulsive', 'aggressive'],
            'social': ['isolated', 'rejected', 'bullied', 'discriminated']
        }
        
        logger.info("MIKA Agent initialized with crisis intervention protocols")
    
    def process(self, request_data: Dict[str, Any]) -> str:
        """Process request with immediate crisis detection and intervention"""
        start_time = time.time()
        
        try:
            # Validate input
            if not self._validate_input(request_data):
                return "I'm here to help if you're in crisis. Can you tell me what's happening?"
            
            # Extract context
            context = self._extract_context(request_data)
            message = context['message']
            
            # Immediate crisis detection (< 1ms target)
            crisis_assessment = self._detect_crisis_immediate(message)
            
            # Enhanced risk assessment
            risk_profile = self._assess_risk_factors(message, context)
            
            # Generate intervention response
            response = self._generate_intervention_response(crisis_assessment, risk_profile, context)
            
            # Log crisis event
            self._log_crisis_event(crisis_assessment, risk_profile, context)
            
            # Record performance
            response_time = time.time() - start_time
            self._record_request(response_time, True)
            
            return response
            
        except Exception as e:
            response_time = time.time() - start_time
            self._record_request(response_time, False)
            return self._handle_crisis_error(e, request_data)
    
    def _detect_crisis_immediate(self, message: str) -> Dict[str, Any]:
        """Immediate crisis detection with sub-millisecond response"""
        message_lower = message.lower()
        
        # Check critical level first (highest priority)
        for level in ['critical', 'high', 'moderate', 'low']:
            level_config = self.crisis_patterns[level]
            
            for category, patterns in level_config.items():
                if isinstance(patterns, list):  # Skip metadata
                    for pattern in patterns:
                        if pattern in message_lower:
                            return {
                                'level': level,
                                'category': category,
                                'detected_pattern': pattern,
                                'confidence': level_config['confidence'],
                                'response_time_target': level_config['response_time'],
                                'escalation_protocol': level_config['escalation'],
                                'requires_immediate_action': level in ['critical', 'high'],
                                'pattern_match_position': message_lower.find(pattern)
                            }
        
        return {
            'level': 'none',
            'category': 'normal',
            'detected_pattern': None,
            'confidence': 0.0,
            'response_time_target': 0.050,
            'escalation_protocol': 'standard_response',
            'requires_immediate_action': False,
            'pattern_match_position': -1
        }
    
    def _assess_risk_factors(self, message: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Assess additional risk factors for comprehensive evaluation"""
        message_lower = message.lower()
        detected_factors = {}
        total_risk_score = 0
        
        for category, factors in self.risk_factors.items():
            detected_in_category = []
            for factor in factors:
                if factor in message_lower:
                    detected_in_category.append(factor)
                    total_risk_score += 1
            
            if detected_in_category:
                detected_factors[category] = detected_in_category
        
        # Additional context-based risk assessment
        history_length = len(context.get('conversation_history', []))
        if history_length > 5:
            total_risk_score += 0.5  # Ongoing conversation may indicate persistent distress
        
        # Calculate risk multiplier
        risk_multiplier = min(2.0, 1.0 + (total_risk_score * 0.1))
        
        return {
            'detected_factors': detected_factors,
            'total_risk_score': total_risk_score,
            'risk_multiplier': risk_multiplier,
            'comprehensive_assessment': total_risk_score > 3,
            'requires_enhanced_intervention': risk_multiplier > 1.5
        }
    
    def _generate_intervention_response(self, crisis_assessment: Dict[str, Any], 
                                      risk_profile: Dict[str, Any], 
                                      context: Dict[str, Any]) -> str:
        """Generate appropriate crisis intervention response"""
        level = crisis_assessment['level']
        
        if level == 'critical':
            return self._generate_critical_response(crisis_assessment, risk_profile)
        elif level == 'high':
            return self._generate_high_response(crisis_assessment, risk_profile)
        elif level == 'moderate':
            return self._generate_moderate_response(crisis_assessment, risk_profile)
        elif level == 'low':
            return self._generate_low_response(crisis_assessment, risk_profile)
        else:
            return self._generate_no_crisis_response(context)
    
    def _generate_critical_response(self, crisis_assessment: Dict[str, Any], 
                                   risk_profile: Dict[str, Any]) -> str:
        """Generate immediate critical crisis response"""
        resources = self.emergency_resources['critical']
        category = crisis_assessment['category']
        
        if category == 'suicide':
            response = (
                "🚨 IMMEDIATE CRISIS ALERT 🚨\n\n"
                "I'm extremely concerned about what you've shared. Your life has immense value.\n\n"
                "IMMEDIATE ACTION REQUIRED:\n"
                f"• CALL {resources['primary']} NOW\n"
                f"• OR CALL/TEXT {resources['crisis']}\n"
                f"• OR {resources['text']}\n\n"
                "If you're in immediate physical danger, call 911.\n\n"
                "You are not alone. Crisis counselors are available 24/7 to help you through this moment."
            )
        elif category == 'medical_emergency':
            response = (
                "🚨 MEDICAL EMERGENCY 🚨\n\n"
                "This appears to be a medical emergency.\n\n"
                "CALL 911 IMMEDIATELY\n\n"
                "If you're unable to call:\n"
                "• Have someone else call for you\n"
                "• Go to the nearest emergency room\n"
                "• Use emergency alert on your phone\n\n"
                "Your safety is the top priority right now."
            )
        else:  # harm_others or immediate_harm
            response = (
                "🚨 CRISIS INTERVENTION REQUIRED 🚨\n\n"
                "I'm very concerned about your safety and the safety of others.\n\n"
                "IMMEDIATE HELP:\n"
                f"• {resources['primary']}\n"
                f"• {resources['crisis']}\n"
                f"• {resources['text']}\n\n"
                "Crisis professionals are trained to help with exactly this situation. "
                "Please reach out now - you don't have to handle this alone."
            )
        
        return response
    
    def _generate_high_response(self, crisis_assessment: Dict[str, Any], 
                               risk_profile: Dict[str, Any]) -> str:
        """Generate high-priority crisis response"""
        resources = self.emergency_resources['high']
        
        return (
            "⚠️ CRISIS SUPPORT NEEDED ⚠️\n\n"
            "I can hear that you're in significant emotional pain right now. "
            "What you're experiencing is serious, and there are people specifically trained to help.\n\n"
            "IMMEDIATE SUPPORT:\n"
            f"• {resources['primary']}\n"
            f"• {resources['crisis']}\n"
            f"• {resources['backup']}\n\n"
            "These services are free, confidential, and available 24/7. "
            "You deserve support, and reaching out shows incredible strength.\n\n"
            "Your life matters. Your pain is real, but it can get better with the right help."
        )
    
    def _generate_moderate_response(self, crisis_assessment: Dict[str, Any], 
                                   risk_profile: Dict[str, Any]) -> str:
        """Generate moderate crisis support response"""
        resources = self.emergency_resources['moderate']
        
        return (
            "💙 CRISIS SUPPORT AVAILABLE 💙\n\n"
            "I can sense that you're going through something really difficult right now. "
            "These feelings can be overwhelming, but you don't have to face them alone.\n\n"
            "SUPPORT OPTIONS:\n"
            f"• {resources['primary']}\n"
            f"• {resources['crisis']}\n"
            f"• {resources['support']}\n\n"
            "Sometimes talking with someone trained in crisis support can provide "
            "new perspectives and coping strategies.\n\n"
            "Your feelings are valid, and seeking help is a sign of wisdom and courage."
        )
    
    def _generate_low_response(self, crisis_assessment: Dict[str, Any], 
                              risk_profile: Dict[str, Any]) -> str:
        """Generate supportive response for low-level distress"""
        resources = self.emergency_resources['low']
        
        return (
            "🤗 SUPPORT & RESOURCES 🤗\n\n"
            "It sounds like you're dealing with some challenging feelings or situations. "
            "It's completely normal to need support during difficult times.\n\n"
            "HELPFUL RESOURCES:\n"
            f"• {resources['primary']}\n"
            f"• {resources['mental_health']}\n"
            f"• {resources['support']}\n\n"
            "Remember that reaching out is a healthy way to cope with stress and challenges. "
            "Many people find that talking with a counselor or trusted person helps them "
            "develop new strategies and feel less alone.\n\n"
            "You're taking a positive step by recognizing when you need support."
        )
    
    def _generate_no_crisis_response(self, context: Dict[str, Any]) -> str:
        """Generate response when no crisis is detected"""
        return (
            "I'm here to listen and provide support. While I don't detect an immediate crisis, "
            "I want you to know that your feelings and experiences are important.\n\n"
            "If you ever need crisis support, these resources are always available:\n"
            "• 988 Suicide & Crisis Lifeline (call or text)\n"
            "• Crisis Text Line: text HOME to 741741\n"
            "• 1-800-662-HELP for mental health support\n\n"
            "What would be most helpful for you to talk about right now?"
        )
    
    def _log_crisis_event(self, crisis_assessment: Dict[str, Any], 
                         risk_profile: Dict[str, Any], context: Dict[str, Any]):
        """Log crisis events for monitoring and improvement"""
        if crisis_assessment['level'] != 'none':
            logger.warning(
                f"CRISIS EVENT - Level: {crisis_assessment['level']}, "
                f"Category: {crisis_assessment['category']}, "
                f"Pattern: {crisis_assessment['detected_pattern']}, "
                f"Confidence: {crisis_assessment['confidence']}, "
                f"Session: {context.get('session_id', 'unknown')}"
            )
    
    def _handle_crisis_error(self, error: Exception, request_data: Dict[str, Any]) -> str:
        """Handle errors in crisis context with safety priority"""
        logger.error(f"MIKA crisis processing error: {error}")
        
        # Always provide crisis resources when there's an error
        return (
            "I'm experiencing a technical issue, but your safety is my priority.\n\n"
            "If you're in crisis, please reach out immediately:\n"
            "• Call or text 988 (Suicide & Crisis Lifeline)\n"
            "• Text HOME to 741741 (Crisis Text Line)\n"
            "• Call 911 if in immediate danger\n\n"
            "These services are available 24/7 to provide professional crisis support."
        )
    
    def calculate_confidence(self, request_data: Dict[str, Any]) -> float:
        """Calculate confidence for crisis-related requests"""
        message = request_data.get('message', '').lower()
        
        # High confidence for crisis-related content
        crisis_indicators = [
            'crisis', 'emergency', 'help', 'suicide', 'harm', 'hurt', 'hopeless',
            'desperate', 'overwhelmed', 'can\'t handle', 'give up', 'end it'
        ]
        
        matches = sum(1 for indicator in crisis_indicators if indicator in message)
        
        # Base confidence for MIKA (crisis specialist)
        base_confidence = 0.6
        crisis_boost = min(0.4, matches * 0.1)
        
        return min(1.0, base_confidence + crisis_boost)