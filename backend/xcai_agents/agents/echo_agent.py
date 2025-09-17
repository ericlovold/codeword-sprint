#!/usr/bin/env python3
"""
ECHO Agent - Context and Conversation History
Core Functions: Context building, memory, conversation history management
Specialization: Multi-cultural awareness, pattern recognition
Workflow: Maintains per-user cultural profiles with context scoring
Integration: Cross-conversational pattern recognition
"""
import time
import json
from typing import Dict, Any, List, Tuple
from datetime import datetime, timedelta
import logging

from ..core.base_agent import SpecializedAgent

logger = logging.getLogger(__name__)

class ECHOAgent(SpecializedAgent):
    """
    ECHO Agent - Context Building and Conversation Memory
    Fibonacci Level: 1 (Primary Support Agent)
    """
    
    def __init__(self):
        super().__init__(
            agent_name="ECHO",
            specialization="Context Building & Conversation Memory",
            agent_version="1.0.0"
        )
        
        # Agent configuration
        self.crisis_capable = True  # Crisis-capable for context in emergencies
        self.response_time_target = 10  # ms
        self.capabilities = [
            "context_building",
            "conversation_memory", 
            "pattern_recognition",
            "emotional_journey_mapping",
            "session_continuity",
            "contextual_insights"
        ]
        
        # Context analysis patterns
        self.context_patterns = {
            'emotional_progression': {
                'improving': ['better', 'improving', 'feeling good', 'progress', 'positive'],
                'declining': ['worse', 'deteriorating', 'getting bad', 'declining', 'downward'],
                'stable': ['same', 'consistent', 'unchanged', 'steady', 'stable'],
                'fluctuating': ['up and down', 'back and forth', 'sometimes', 'varies', 'mixed']
            },
            'support_seeking': {
                'direct': ['help me', 'need support', 'what should i do', 'advice', 'guidance'],
                'indirect': ['struggling with', 'difficult time', 'not sure', 'confused', 'lost'],
                'resistant': ['fine', 'okay', 'nothing wrong', 'don\'t need help', 'handle it myself'],
                'ready': ['open to', 'willing to try', 'ready for help', 'want to change']
            },
            'relationship_dynamics': {
                'family': ['family', 'parents', 'siblings', 'relatives', 'home'],
                'romantic': ['partner', 'boyfriend', 'girlfriend', 'spouse', 'relationship'],
                'friends': ['friends', 'social', 'peers', 'group', 'friendship'],
                'professional': ['work', 'boss', 'colleague', 'job', 'career'],
                'isolation': ['alone', 'lonely', 'isolated', 'no one', 'by myself']
            },
            'life_domains': {
                'health': ['health', 'medical', 'physical', 'body', 'illness', 'doctor'],
                'work': ['job', 'work', 'career', 'employment', 'workplace', 'professional'],
                'education': ['school', 'college', 'study', 'academic', 'learning', 'grades'],
                'finances': ['money', 'financial', 'budget', 'debt', 'income', 'expenses'],
                'housing': ['home', 'housing', 'apartment', 'living', 'rent', 'mortgage']
            }
        }
        
        # Conversation flow indicators
        self.flow_indicators = {
            'opening': ['first time', 'new here', 'never talked', 'beginning'],
            'continuing': ['last time', 'mentioned before', 'as i said', 'previously'],
            'deepening': ['more about', 'deeper', 'really', 'honestly', 'truth is'],
            'closing': ['thank you', 'that helps', 'feel better', 'good to talk'],
            'crisis_escalation': ['getting worse', 'can\'t handle', 'emergency', 'immediate help']
        }
        
        # Memory storage for session continuity
        self.session_memory = {}
        self.pattern_memory = {}
        
        logger.info("ECHO Agent initialized with context building and memory capabilities")
    
    def process(self, request_data: Dict[str, Any]) -> str:
        """Process request with context building and memory integration"""
        start_time = time.time()
        
        try:
            # Validate input
            if not self._validate_input(request_data):
                return "I'm here to help build context for your conversation. What would you like to talk about?"
            
            # Extract context
            context = self._extract_context(request_data)
            session_id = context['session_id']
            message = context['message']
            
            # Build conversation context
            conversation_context = self._build_conversation_context(context)
            
            # Analyze conversation patterns
            pattern_analysis = self._analyze_conversation_patterns(message, conversation_context)
            
            # Emotional journey mapping
            emotional_journey = self._map_emotional_journey(conversation_context)
            
            # Generate contextual insights
            contextual_insights = self._generate_contextual_insights(
                conversation_context, pattern_analysis, emotional_journey
            )
            
            # Update session memory
            self._update_session_memory(session_id, {
                'conversation_context': conversation_context,
                'pattern_analysis': pattern_analysis,
                'emotional_journey': emotional_journey,
                'insights': contextual_insights,
                'timestamp': datetime.utcnow().isoformat()
            })
            
            # Record performance
            response_time = time.time() - start_time
            self._record_request(response_time, True)
            
            return self._format_context_response(contextual_insights)
            
        except Exception as e:
            response_time = time.time() - start_time
            self._record_request(response_time, False)
            return self._handle_error(e, request_data)
    
    def _build_conversation_context(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Build comprehensive conversation context"""
        session_id = context['session_id']
        current_message = context['message']
        conversation_history = context.get('conversation_history', [])
        
        # Retrieve session memory
        session_data = self.session_memory.get(session_id, {})
        
        # Analyze conversation flow
        flow_stage = self._analyze_conversation_flow(current_message, conversation_history)
        
        # Extract conversation themes
        themes = self._extract_conversation_themes(current_message, conversation_history)
        
        # Assess conversation depth
        depth_analysis = self._assess_conversation_depth(conversation_history)
        
        # Track emotional continuity
        emotional_continuity = self._track_emotional_continuity(
            current_message, conversation_history, session_data
        )
        
        return {
            'session_id': session_id,
            'message_count': len(conversation_history) + 1,
            'flow_stage': flow_stage,
            'themes': themes,
            'depth_analysis': depth_analysis,
            'emotional_continuity': emotional_continuity,
            'session_duration': self._calculate_session_duration(session_data),
            'previous_insights': session_data.get('insights', {}),
            'conversation_quality': self._assess_conversation_quality(conversation_history)
        }
    
    def _analyze_conversation_flow(self, current_message: str, history: List[Dict]) -> Dict[str, Any]:
        """Analyze the flow and stage of conversation"""
        message_lower = current_message.lower()
        message_count = len(history) + 1
        
        # Detect flow indicators
        detected_flows = {}
        for flow_type, indicators in self.flow_indicators.items():
            matches = [indicator for indicator in indicators if indicator in message_lower]
            if matches:
                detected_flows[flow_type] = {
                    'matches': matches,
                    'confidence': len(matches) / len(indicators)
                }
        
        # Determine primary flow stage
        if message_count == 1:
            primary_stage = 'opening'
        elif detected_flows.get('crisis_escalation'):
            primary_stage = 'crisis_escalation'
        elif detected_flows.get('closing'):
            primary_stage = 'closing'
        elif detected_flows.get('deepening'):
            primary_stage = 'deepening'
        elif detected_flows.get('continuing'):
            primary_stage = 'continuing'
        else:
            primary_stage = 'developing'
        
        return {
            'primary_stage': primary_stage,
            'detected_flows': detected_flows,
            'message_count': message_count,
            'stage_confidence': detected_flows.get(primary_stage, {}).get('confidence', 0.5)
        }
    
    def _extract_conversation_themes(self, current_message: str, history: List[Dict]) -> Dict[str, Any]:
        """Extract and track conversation themes"""
        all_messages = [msg.get('content', '') for msg in history] + [current_message]
        combined_text = ' '.join(all_messages).lower()
        
        detected_themes = {}
        
        # Analyze each pattern category
        for category, patterns in self.context_patterns.items():
            category_themes = {}
            for theme, keywords in patterns.items():
                matches = sum(1 for keyword in keywords if keyword in combined_text)
                if matches > 0:
                    category_themes[theme] = {
                        'frequency': matches,
                        'relevance': matches / len(keywords),
                        'recent': any(keyword in current_message.lower() for keyword in keywords)
                    }
            
            if category_themes:
                detected_themes[category] = category_themes
        
        # Identify dominant themes
        dominant_themes = self._identify_dominant_themes(detected_themes)
        
        return {
            'detected_themes': detected_themes,
            'dominant_themes': dominant_themes,
            'theme_consistency': self._calculate_theme_consistency(detected_themes),
            'theme_evolution': self._track_theme_evolution(detected_themes, history)
        }
    
    def _assess_conversation_depth(self, history: List[Dict]) -> Dict[str, Any]:
        """Assess the depth and engagement level of conversation"""
        if not history:
            return {'level': 'surface', 'score': 0.1, 'indicators': []}
        
        # Calculate depth indicators
        avg_message_length = sum(len(msg.get('content', '')) for msg in history) / len(history)
        emotional_words = sum(1 for msg in history if self._contains_emotional_language(msg.get('content', '')))
        personal_disclosures = sum(1 for msg in history if self._contains_personal_disclosure(msg.get('content', '')))
        
        # Calculate depth score
        depth_score = (
            min(1.0, avg_message_length / 100) * 0.3 +  # Message length component
            min(1.0, emotional_words / len(history)) * 0.4 +  # Emotional content component
            min(1.0, personal_disclosures / len(history)) * 0.3  # Personal disclosure component
        )
        
        # Determine depth level
        if depth_score > 0.7:
            depth_level = 'deep'
        elif depth_score > 0.4:
            depth_level = 'moderate'
        elif depth_score > 0.2:
            depth_level = 'developing'
        else:
            depth_level = 'surface'
        
        return {
            'level': depth_level,
            'score': depth_score,
            'avg_message_length': avg_message_length,
            'emotional_content': emotional_words / max(1, len(history)),
            'personal_disclosure': personal_disclosures / max(1, len(history)),
            'indicators': self._get_depth_indicators(depth_level)
        }
    
    def _track_emotional_continuity(self, current_message: str, history: List[Dict], 
                                   session_data: Dict[str, Any]) -> Dict[str, Any]:
        """Track emotional continuity and changes throughout conversation"""
        current_emotional_state = self._analyze_emotional_state(current_message)
        
        # Get previous emotional states
        previous_states = []
        for msg in history[-3:]:  # Last 3 messages
            emotional_state = self._analyze_emotional_state(msg.get('content', ''))
            previous_states.append(emotional_state)
        
        # Calculate emotional consistency
        emotional_consistency = self._calculate_emotional_consistency(current_emotional_state, previous_states)
        
        # Detect emotional shifts
        emotional_shifts = self._detect_emotional_shifts(current_emotional_state, previous_states)
        
        return {
            'current_state': current_emotional_state,
            'previous_states': previous_states,
            'consistency': emotional_consistency,
            'shifts': emotional_shifts,
            'emotional_trajectory': self._determine_emotional_trajectory(previous_states + [current_emotional_state])
        }
    
    def _analyze_conversation_patterns(self, current_message: str, 
                                     conversation_context: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze patterns in conversation for insights"""
        patterns = {
            'repetitive_themes': self._detect_repetitive_themes(conversation_context),
            'support_seeking_evolution': self._track_support_seeking(conversation_context),
            'engagement_patterns': self._analyze_engagement_patterns(conversation_context),
            'crisis_indicators': self._detect_crisis_patterns(conversation_context),
            'progress_indicators': self._detect_progress_patterns(conversation_context)
        }
        
        return patterns
    
    def _map_emotional_journey(self, conversation_context: Dict[str, Any]) -> Dict[str, Any]:
        """Map the emotional journey throughout the conversation"""
        emotional_data = conversation_context.get('emotional_continuity', {})
        
        # Create emotional timeline
        emotional_timeline = []
        current_state = emotional_data.get('current_state', {})
        previous_states = emotional_data.get('previous_states', [])
        
        for i, state in enumerate(previous_states + [current_state]):
            emotional_timeline.append({
                'position': i,
                'primary_emotion': state.get('primary_emotion', 'neutral'),
                'intensity': state.get('intensity', 0.0),
                'valence': state.get('valence', 0.0)  # positive/negative
            })
        
        # Analyze journey characteristics
        journey_analysis = {
            'timeline': emotional_timeline,
            'overall_trend': self._calculate_emotional_trend(emotional_timeline),
            'volatility': self._calculate_emotional_volatility(emotional_timeline),
            'dominant_emotions': self._identify_dominant_emotions(emotional_timeline),
            'improvement_indicators': self._detect_improvement_indicators(emotional_timeline)
        }
        
        return journey_analysis
    
    def _generate_contextual_insights(self, conversation_context: Dict[str, Any],
                                     pattern_analysis: Dict[str, Any],
                                     emotional_journey: Dict[str, Any]) -> Dict[str, Any]:
        """Generate actionable contextual insights"""
        insights = {
            'conversation_summary': self._generate_conversation_summary(conversation_context),
            'key_patterns': self._identify_key_patterns(pattern_analysis),
            'emotional_insights': self._generate_emotional_insights(emotional_journey),
            'recommendations': self._generate_context_recommendations(
                conversation_context, pattern_analysis, emotional_journey
            ),
            'risk_factors': self._identify_contextual_risk_factors(pattern_analysis),
            'strengths': self._identify_contextual_strengths(conversation_context, emotional_journey)
        }
        
        return insights
    
    def _format_context_response(self, contextual_insights: Dict[str, Any]) -> str:
        """Format contextual insights into response"""
        response_parts = []
        
        # Conversation summary
        summary = contextual_insights.get('conversation_summary', '')
        if summary:
            response_parts.append(f"Context Summary: {summary}")
        
        # Key patterns
        patterns = contextual_insights.get('key_patterns', [])
        if patterns:
            response_parts.append("Key Patterns:")
            response_parts.extend([f"• {pattern}" for pattern in patterns[:3]])
        
        # Emotional insights
        emotional = contextual_insights.get('emotional_insights', [])
        if emotional:
            response_parts.append("Emotional Journey:")
            response_parts.extend([f"• {insight}" for insight in emotional[:2]])
        
        # Recommendations
        recommendations = contextual_insights.get('recommendations', [])
        if recommendations:
            response_parts.append("Context-Based Recommendations:")
            response_parts.extend([f"• {rec}" for rec in recommendations[:2]])
        
        if not response_parts:
            return "Context analysis complete. Continuing conversation with enhanced understanding."
        
        return "\n".join(response_parts)
    
    # Helper methods for context analysis
    def _contains_emotional_language(self, message: str) -> bool:
        """Check if message contains emotional language"""
        emotional_words = ['feel', 'emotion', 'sad', 'happy', 'angry', 'scared', 'worried', 'excited', 'frustrated']
        return any(word in message.lower() for word in emotional_words)
    
    def _contains_personal_disclosure(self, message: str) -> bool:
        """Check if message contains personal disclosure"""
        disclosure_indicators = ['my', 'i am', 'i have', 'i feel', 'personal', 'private', 'secret']
        return any(indicator in message.lower() for indicator in disclosure_indicators)
    
    def _analyze_emotional_state(self, message: str) -> Dict[str, Any]:
        """Analyze emotional state in a message"""
        # Simplified emotional analysis (would be enhanced with NEO integration)
        positive_words = ['happy', 'good', 'better', 'positive', 'excited', 'grateful']
        negative_words = ['sad', 'bad', 'worse', 'negative', 'depressed', 'angry']
        
        positive_count = sum(1 for word in positive_words if word in message.lower())
        negative_count = sum(1 for word in negative_words if word in message.lower())
        
        if positive_count > negative_count:
            primary_emotion = 'positive'
            valence = 1.0
        elif negative_count > positive_count:
            primary_emotion = 'negative'
            valence = -1.0
        else:
            primary_emotion = 'neutral'
            valence = 0.0
        
        intensity = min(1.0, (positive_count + negative_count) / 5)
        
        return {
            'primary_emotion': primary_emotion,
            'valence': valence,
            'intensity': intensity,
            'positive_indicators': positive_count,
            'negative_indicators': negative_count
        }
    
    def _update_session_memory(self, session_id: str, data: Dict[str, Any]):
        """Update session memory with new data"""
        if session_id not in self.session_memory:
            self.session_memory[session_id] = {
                'created_at': datetime.utcnow().isoformat(),
                'history': []
            }
        
        self.session_memory[session_id]['history'].append(data)
        self.session_memory[session_id]['last_updated'] = datetime.utcnow().isoformat()
        
        # Keep only last 10 entries per session for memory management
        if len(self.session_memory[session_id]['history']) > 10:
            self.session_memory[session_id]['history'] = self.session_memory[session_id]['history'][-10:]
    
    def calculate_confidence(self, request_data: Dict[str, Any]) -> float:
        """Calculate confidence for context building requests"""
        # ECHO has high confidence for all requests as it provides context for other agents
        return 0.9