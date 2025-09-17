#!/usr/bin/env python3
"""
NEMO Agent - Cultural Intelligence & Equity
Core Functions: Cultural equity analysis, consideration tracking
Capabilities: 9 cultural dimensions (language, ethnicity, religion, gender, sexuality, age, disability, socioeconomic, geography)
Workflow: Real-time equity assessment with importance/confidence scoring
Output: Cultural insights and priority considerations
"""
import time
import re
from typing import Dict, Any, List, Tuple
from datetime import datetime
import logging

from ..core.base_agent import SpecializedAgent

logger = logging.getLogger(__name__)

class NEMOAgent(SpecializedAgent):
    """
    NEMO Agent - Cultural Intelligence and Equity Analysis
    Fibonacci Level: 2 (Cultural Specialist)
    """
    
    def __init__(self):
        super().__init__(
            agent_name="NEMO",
            specialization="Cultural Intelligence & Equity",
            agent_version="1.0.0"
        )
        
        # Agent configuration
        self.crisis_capable = False
        self.response_time_target = 30  # ms
        self.capabilities = [
            "cultural_analysis",
            "equity_assessment", 
            "bias_detection",
            "inclusive_response",
            "cultural_context",
            "diversity_considerations"
        ]
        
        # 9 Cultural Dimensions Framework
        self.cultural_dimensions = {
            'language': {
                'indicators': [
                    'english second language', 'esl', 'non-native speaker', 'language barrier',
                    'translation', 'interpreter', 'accent', 'bilingual', 'multilingual',
                    'spanish', 'chinese', 'arabic', 'hindi', 'french', 'german', 'portuguese'
                ],
                'considerations': [
                    'Language accessibility and clarity',
                    'Cultural communication styles',
                    'Potential translation needs',
                    'Non-verbal communication differences'
                ],
                'weight': 0.15
            },
            'ethnicity': {
                'indicators': [
                    'african american', 'black', 'latino', 'hispanic', 'asian', 'native american',
                    'indigenous', 'white', 'caucasian', 'multiracial', 'ethnic background',
                    'cultural heritage', 'ancestry', 'tribal', 'immigrant'
                ],
                'considerations': [
                    'Historical trauma awareness',
                    'Cultural values and practices',
                    'Systemic discrimination experiences',
                    'Community support systems'
                ],
                'weight': 0.15
            },
            'religion': {
                'indicators': [
                    'christian', 'muslim', 'jewish', 'hindu', 'buddhist', 'atheist', 'agnostic',
                    'spiritual', 'faith', 'religious', 'church', 'mosque', 'synagogue', 'temple',
                    'prayer', 'beliefs', 'secular', 'non-religious'
                ],
                'considerations': [
                    'Religious coping mechanisms',
                    'Faith-based support systems',
                    'Religious conflicts or questions',
                    'Spiritual practices and beliefs'
                ],
                'weight': 0.12
            },
            'gender': {
                'indicators': [
                    'woman', 'man', 'female', 'male', 'transgender', 'trans', 'non-binary',
                    'genderfluid', 'genderqueer', 'cisgender', 'gender identity', 'pronouns',
                    'she/her', 'he/him', 'they/them', 'gender expression'
                ],
                'considerations': [
                    'Gender-specific stressors',
                    'Identity affirmation needs',
                    'Discrimination experiences',
                    'Appropriate pronoun usage'
                ],
                'weight': 0.13
            },
            'sexuality': {
                'indicators': [
                    'gay', 'lesbian', 'bisexual', 'straight', 'heterosexual', 'queer', 'lgbtq',
                    'pansexual', 'asexual', 'sexual orientation', 'coming out', 'pride',
                    'same-sex', 'partner', 'relationship'
                ],
                'considerations': [
                    'Identity acceptance and disclosure',
                    'Family and social acceptance',
                    'Discrimination and safety concerns',
                    'Community support resources'
                ],
                'weight': 0.12
            },
            'age': {
                'indicators': [
                    'teenager', 'teen', 'adolescent', 'young adult', 'college', 'elderly',
                    'senior', 'aging', 'retirement', 'middle-aged', 'child', 'minor',
                    'generation gap', 'ageism'
                ],
                'considerations': [
                    'Developmental stage needs',
                    'Generational perspectives',
                    'Age-appropriate resources',
                    'Life transition challenges'
                ],
                'weight': 0.10
            },
            'disability': {
                'indicators': [
                    'disability', 'disabled', 'autism', 'adhd', 'depression', 'anxiety',
                    'mental illness', 'chronic illness', 'physical disability', 'wheelchair',
                    'blind', 'deaf', 'accessibility', 'accommodation', 'neurodivergent'
                ],
                'considerations': [
                    'Accessibility needs',
                    'Stigma and discrimination',
                    'Accommodation requirements',
                    'Strengths-based perspective'
                ],
                'weight': 0.13
            },
            'socioeconomic': {
                'indicators': [
                    'poor', 'poverty', 'homeless', 'unemployed', 'financial stress',
                    'working class', 'middle class', 'wealthy', 'education level',
                    'college educated', 'high school', 'job loss', 'economic hardship'
                ],
                'considerations': [
                    'Resource accessibility',
                    'Economic stressors',
                    'Class-based experiences',
                    'Educational background'
                ],
                'weight': 0.12
            },
            'geography': {
                'indicators': [
                    'rural', 'urban', 'suburban', 'city', 'small town', 'isolated',
                    'remote', 'metropolitan', 'regional', 'international', 'immigrant',
                    'refugee', 'displaced', 'location', 'community'
                ],
                'considerations': [
                    'Regional cultural norms',
                    'Resource availability',
                    'Community support systems',
                    'Geographic isolation factors'
                ],
                'weight': 0.08
            }
        }
        
        # Bias detection patterns
        self.bias_patterns = {
            'assumptions': [
                'all people like you', 'your people', 'typical for', 'usually',
                'most people in your culture', 'traditional for'
            ],
            'stereotypes': [
                'strong and independent', 'naturally good at', 'tend to be',
                'expected to', 'supposed to', 'your kind'
            ],
            'microaggressions': [
                'articulate for', 'exotic', 'where are you really from',
                'you don\'t look like', 'so intelligent for'
            ]
        }
        
        # Inclusive language suggestions
        self.inclusive_language = {
            'gender_neutral': {
                'person': 'person',
                'individual': 'individual',
                'they/them': 'they/them when unsure',
                'partner': 'partner instead of boyfriend/girlfriend',
                'folks': 'folks instead of guys'
            },
            'ability_first': {
                'person with': 'person with [condition] rather than [condition] person',
                'experiences': 'experiences [condition] rather than suffers from',
                'has': 'has [condition] rather than is [condition]'
            },
            'cultural_respect': {
                'background': 'cultural background rather than exotic',
                'heritage': 'heritage rather than bloodline',
                'community': 'community rather than tribe (unless appropriate)'
            }
        }
        
        logger.info("NEMO Agent initialized with 9-dimension cultural intelligence")
    
    def process(self, request_data: Dict[str, Any]) -> str:
        """Process request with cultural intelligence and equity analysis"""
        start_time = time.time()
        
        try:
            # Validate input
            if not self._validate_input(request_data):
                return self._generate_inclusive_greeting()
            
            # Extract context
            context = self._extract_context(request_data)
            message = context['message']
            
            # Cultural dimension analysis
            cultural_profile = self._analyze_cultural_dimensions(message, context)
            
            # Equity assessment
            equity_considerations = self._assess_equity_needs(cultural_profile, context)
            
            # Bias detection
            bias_analysis = self._detect_bias_patterns(message)
            
            # Generate culturally aware insights
            cultural_insights = self._generate_cultural_insights(
                cultural_profile, equity_considerations, bias_analysis
            )
            
            # Record performance
            response_time = time.time() - start_time
            self._record_request(response_time, True)
            
            return self._format_cultural_response(cultural_insights)
            
        except Exception as e:
            response_time = time.time() - start_time
            self._record_request(response_time, False)
            return self._handle_error(e, request_data)
    
    def _analyze_cultural_dimensions(self, message: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze message across 9 cultural dimensions"""
        message_lower = message.lower()
        cultural_profile = {}
        total_cultural_score = 0
        
        for dimension, config in self.cultural_dimensions.items():
            indicators = config['indicators']
            considerations = config['considerations']
            weight = config['weight']
            
            # Check for indicators in message
            detected_indicators = [indicator for indicator in indicators if indicator in message_lower]
            
            if detected_indicators:
                confidence = min(1.0, len(detected_indicators) / len(indicators) * 3)  # Boost confidence
                importance = confidence * weight
                total_cultural_score += importance
                
                cultural_profile[dimension] = {
                    'detected': True,
                    'indicators': detected_indicators,
                    'considerations': considerations,
                    'confidence': confidence,
                    'importance': importance,
                    'weight': weight
                }
        
        # Calculate cultural complexity
        cultural_complexity = len(cultural_profile)
        requires_cultural_adaptation = total_cultural_score > 0.3
        
        return {
            'dimensions': cultural_profile,
            'total_score': total_cultural_score,
            'complexity': cultural_complexity,
            'requires_adaptation': requires_cultural_adaptation,
            'primary_dimensions': self._identify_primary_dimensions(cultural_profile)
        }
    
    def _identify_primary_dimensions(self, cultural_profile: Dict[str, Any]) -> List[str]:
        """Identify the most relevant cultural dimensions"""
        if not cultural_profile:
            return []
        
        # Sort by importance score
        sorted_dimensions = sorted(
            cultural_profile.items(),
            key=lambda x: x[1]['importance'],
            reverse=True
        )
        
        # Return top 3 most important dimensions
        return [dim[0] for dim in sorted_dimensions[:3]]
    
    def _assess_equity_needs(self, cultural_profile: Dict[str, Any], 
                            context: Dict[str, Any]) -> Dict[str, Any]:
        """Assess equity and inclusion needs"""
        equity_score = 0
        priority_considerations = []
        adaptation_needs = []
        
        for dimension, info in cultural_profile.get('dimensions', {}).items():
            importance = info['importance']
            considerations = info['considerations']
            
            # Higher importance = higher equity priority
            if importance > 0.4:
                equity_score += importance
                priority_considerations.extend(considerations)
                adaptation_needs.append({
                    'dimension': dimension,
                    'importance': importance,
                    'considerations': considerations
                })
        
        # Calculate equity priority level
        if equity_score > 0.8:
            priority_level = 'high'
        elif equity_score > 0.4:
            priority_level = 'medium'
        elif equity_score > 0.1:
            priority_level = 'low'
        else:
            priority_level = 'standard'
        
        return {
            'priority_level': priority_level,
            'equity_score': equity_score,
            'priority_considerations': list(set(priority_considerations)),
            'adaptation_needs': adaptation_needs,
            'requires_inclusive_response': equity_score > 0.2
        }
    
    def _detect_bias_patterns(self, message: str) -> Dict[str, Any]:
        """Detect potential bias patterns in the conversation"""
        message_lower = message.lower()
        detected_biases = {}
        
        for bias_type, patterns in self.bias_patterns.items():
            detected_patterns = [pattern for pattern in patterns if pattern in message_lower]
            if detected_patterns:
                detected_biases[bias_type] = {
                    'patterns': detected_patterns,
                    'severity': len(detected_patterns) / len(patterns),
                    'requires_attention': len(detected_patterns) > 0
                }
        
        has_bias_concerns = len(detected_biases) > 0
        bias_severity = sum(info['severity'] for info in detected_biases.values())
        
        return {
            'detected_biases': detected_biases,
            'has_concerns': has_bias_concerns,
            'severity_score': bias_severity,
            'requires_intervention': bias_severity > 0.3
        }
    
    def _generate_cultural_insights(self, cultural_profile: Dict[str, Any],
                                   equity_considerations: Dict[str, Any],
                                   bias_analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Generate cultural insights and recommendations"""
        insights = {
            'cultural_awareness': self._generate_awareness_insights(cultural_profile),
            'equity_recommendations': self._generate_equity_recommendations(equity_considerations),
            'bias_mitigation': self._generate_bias_mitigation(bias_analysis),
            'inclusive_language': self._suggest_inclusive_language(cultural_profile),
            'response_adaptations': self._suggest_response_adaptations(cultural_profile, equity_considerations)
        }
        
        return insights
    
    def _generate_awareness_insights(self, cultural_profile: Dict[str, Any]) -> List[str]:
        """Generate cultural awareness insights"""
        insights = []
        
        primary_dimensions = cultural_profile.get('primary_dimensions', [])
        for dimension in primary_dimensions:
            if dimension in cultural_profile['dimensions']:
                considerations = cultural_profile['dimensions'][dimension]['considerations']
                insights.extend(considerations[:2])  # Top 2 considerations per dimension
        
        return insights
    
    def _generate_equity_recommendations(self, equity_considerations: Dict[str, Any]) -> List[str]:
        """Generate equity and inclusion recommendations"""
        recommendations = []
        priority_level = equity_considerations['priority_level']
        
        if priority_level == 'high':
            recommendations.extend([
                'Prioritize cultural sensitivity in response',
                'Consider multiple cultural perspectives',
                'Acknowledge potential systemic barriers',
                'Offer culturally relevant resources'
            ])
        elif priority_level == 'medium':
            recommendations.extend([
                'Be mindful of cultural context',
                'Use inclusive language',
                'Consider cultural support systems'
            ])
        elif priority_level == 'low':
            recommendations.append('Maintain cultural awareness in response')
        
        return recommendations
    
    def _generate_bias_mitigation(self, bias_analysis: Dict[str, Any]) -> List[str]:
        """Generate bias mitigation strategies"""
        mitigation = []
        
        if bias_analysis['has_concerns']:
            mitigation.extend([
                'Avoid cultural assumptions',
                'Use person-first language',
                'Question implicit biases',
                'Focus on individual experiences'
            ])
        
        if bias_analysis['requires_intervention']:
            mitigation.extend([
                'Address potential stereotypes',
                'Provide alternative perspectives',
                'Educate about cultural complexity'
            ])
        
        return mitigation
    
    def _suggest_inclusive_language(self, cultural_profile: Dict[str, Any]) -> Dict[str, str]:
        """Suggest inclusive language alternatives"""
        suggestions = {}
        dimensions = cultural_profile.get('dimensions', {})
        
        if 'gender' in dimensions:
            suggestions.update(self.inclusive_language['gender_neutral'])
        
        if 'disability' in dimensions:
            suggestions.update(self.inclusive_language['ability_first'])
        
        if any(dim in dimensions for dim in ['ethnicity', 'religion', 'geography']):
            suggestions.update(self.inclusive_language['cultural_respect'])
        
        return suggestions
    
    def _suggest_response_adaptations(self, cultural_profile: Dict[str, Any],
                                     equity_considerations: Dict[str, Any]) -> List[str]:
        """Suggest response adaptations for cultural sensitivity"""
        adaptations = []
        
        if cultural_profile['requires_adaptation']:
            adaptations.extend([
                'Acknowledge cultural context',
                'Validate cultural experiences',
                'Consider community perspectives'
            ])
        
        if equity_considerations['requires_inclusive_response']:
            adaptations.extend([
                'Use culturally sensitive examples',
                'Reference appropriate resources',
                'Respect cultural values and practices'
            ])
        
        return adaptations
    
    def _format_cultural_response(self, cultural_insights: Dict[str, Any]) -> str:
        """Format cultural insights into actionable response"""
        response_parts = []
        
        # Cultural awareness
        awareness = cultural_insights['cultural_awareness']
        if awareness:
            response_parts.append("Cultural Considerations:")
            response_parts.extend([f"• {insight}" for insight in awareness[:3]])
        
        # Equity recommendations
        equity_recs = cultural_insights['equity_recommendations']
        if equity_recs:
            response_parts.append("\nEquity & Inclusion:")
            response_parts.extend([f"• {rec}" for rec in equity_recs[:3]])
        
        # Bias mitigation
        bias_mit = cultural_insights['bias_mitigation']
        if bias_mit:
            response_parts.append("\nBias Mitigation:")
            response_parts.extend([f"• {mit}" for mit in bias_mit[:2]])
        
        # Response adaptations
        adaptations = cultural_insights['response_adaptations']
        if adaptations:
            response_parts.append("\nResponse Adaptations:")
            response_parts.extend([f"• {adapt}" for adapt in adaptations[:2]])
        
        if not response_parts:
            return "Standard cultural considerations apply. Maintain inclusive and respectful communication."
        
        return "\n".join(response_parts)
    
    def _generate_inclusive_greeting(self) -> str:
        """Generate an inclusive greeting response"""
        return (
            "I'm here to provide culturally sensitive support that honors your unique background and experiences. "
            "Please feel free to share what's on your mind, and I'll do my best to understand and respond "
            "in a way that respects your cultural context and identity."
        )
    
    def calculate_confidence(self, request_data: Dict[str, Any]) -> float:
        """Calculate confidence for cultural analysis requests"""
        message = request_data.get('message', '').lower()
        
        # Look for cultural indicators across all dimensions
        cultural_indicators = []
        for dimension_config in self.cultural_dimensions.values():
            cultural_indicators.extend(dimension_config['indicators'])
        
        matches = sum(1 for indicator in cultural_indicators if indicator in message)
        
        # Base confidence for NEMO (cultural specialist)
        base_confidence = 0.3  # Lower base since not all requests need cultural analysis
        cultural_boost = min(0.6, matches * 0.05)
        
        return min(1.0, base_confidence + cultural_boost)