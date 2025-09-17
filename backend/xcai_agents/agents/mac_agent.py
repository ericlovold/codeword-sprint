#!/usr/bin/env python3
"""
MAC Agent - Moderation & Compliance Adjudication
Core Functions: Regulatory compliance, content moderation, safety validation
Compliance Areas: HIPAA, GDPR, platform ToS, ethical guidelines, content safety
Crisis Prevention: Blocks unsafe recommendations, adds medical disclaimers
Audit Trail: Complete compliance history with flag tracking
"""
import time
import re
import hashlib
from typing import Dict, Any, List, Tuple
from datetime import datetime
import logging

from ..core.base_agent import SpecializedAgent

logger = logging.getLogger(__name__)

class MACAgent(SpecializedAgent):
    """
    MAC Agent - Moderation and Compliance Adjudication
    Fibonacci Level: 3 (Compliance Specialist)
    """
    
    def __init__(self):
        super().__init__(
            agent_name="MAC",
            specialization="Moderation & Compliance Adjudication",
            agent_version="1.0.0"
        )
        
        # Agent configuration
        self.crisis_capable = True  # Crisis-capable for safety validation
        self.response_time_target = 20  # ms
        self.capabilities = [
            "compliance_validation",
            "content_moderation", 
            "safety_assessment",
            "regulatory_adherence",
            "audit_trail",
            "risk_mitigation"
        ]
        
        # HIPAA Compliance Framework
        self.hipaa_compliance = {
            'protected_health_info': {
                'identifiers': [
                    'social security', 'ssn', 'medical record', 'patient id', 'diagnosis',
                    'prescription', 'medication', 'doctor name', 'hospital', 'clinic',
                    'insurance', 'medicaid', 'medicare', 'health plan'
                ],
                'risk_level': 'high',
                'action': 'redact_and_warn'
            },
            'medical_advice': {
                'indicators': [
                    'you should take', 'i recommend medication', 'stop taking',
                    'increase dosage', 'medical diagnosis', 'prescribe', 'treatment plan'
                ],
                'risk_level': 'high',
                'action': 'add_disclaimer'
            },
            'health_guidance': {
                'indicators': [
                    'health tips', 'wellness advice', 'medical information',
                    'symptoms suggest', 'might have', 'could be'
                ],
                'risk_level': 'medium',
                'action': 'add_disclaimer'
            }
        }
        
        # GDPR Compliance Framework
        self.gdpr_compliance = {
            'personal_data': {
                'identifiers': [
                    'full name', 'email address', 'phone number', 'address',
                    'credit card', 'bank account', 'ip address', 'location data'
                ],
                'risk_level': 'high',
                'action': 'data_protection_notice'
            },
            'consent_tracking': {
                'required_for': ['data_processing', 'communication', 'analytics'],
                'retention_policy': '2_years',
                'deletion_rights': True
            }
        }
        
        # Content Safety Framework
        self.content_safety = {
            'harmful_content': {
                'violence': ['violence', 'harm', 'attack', 'assault', 'abuse'],
                'self_harm': ['suicide methods', 'self-harm techniques', 'cutting methods'],
                'illegal_activities': ['illegal drugs', 'fraud', 'theft', 'hacking'],
                'harassment': ['bullying', 'stalking', 'doxxing', 'threatening'],
                'risk_level': 'critical',
                'action': 'block_and_escalate'
            },
            'inappropriate_content': {
                'adult_content': ['sexual', 'explicit', 'nsfw', 'pornographic'],
                'substance_abuse': ['drug use guide', 'alcohol abuse', 'substance methods'],
                'risk_level': 'high',
                'action': 'moderate_and_warn'
            },
            'misinformation': {
                'medical_misinformation': ['cure cancer', 'miracle treatment', 'doctors hate'],
                'conspiracy_theories': ['government conspiracy', 'fake pandemic'],
                'risk_level': 'medium',
                'action': 'fact_check_disclaimer'
            }
        }
        
        # Ethical Guidelines Framework
        self.ethical_guidelines = {
            'professional_boundaries': {
                'therapeutic_relationship': [
                    'therapist-client', 'professional boundaries', 'dual relationships'
                ],
                'scope_of_practice': [
                    'ai limitations', 'not a replacement', 'professional help'
                ],
                'risk_level': 'medium',
                'action': 'boundary_reminder'
            },
            'cultural_sensitivity': {
                'discriminatory_language': [
                    'racial slurs', 'hate speech', 'discriminatory terms'
                ],
                'cultural_appropriation': [
                    'cultural stereotypes', 'inappropriate generalizations'
                ],
                'risk_level': 'high',
                'action': 'cultural_correction'
            }
        }
        
        # Audit trail storage
        self.audit_trail = []
        self.compliance_flags = {}
        
        # Medical disclaimers
        self.medical_disclaimers = {
            'general': (
                "\n\n⚠️ MEDICAL DISCLAIMER: This information is for educational purposes only "
                "and is not intended as medical advice. Always consult with a qualified "
                "healthcare professional for medical concerns."
            ),
            'crisis': (
                "\n\n🚨 CRISIS DISCLAIMER: If you're experiencing a medical emergency, "
                "call 911 immediately. For mental health crises, call 988 or text HOME to 741741."
            ),
            'medication': (
                "\n\n💊 MEDICATION DISCLAIMER: Never start, stop, or change medications "
                "without consulting your healthcare provider. This is not medical advice."
            )
        }
        
        logger.info("MAC Agent initialized with compliance and safety frameworks")
    
    def process(self, request_data: Dict[str, Any]) -> str:
        """Process request with comprehensive compliance and safety validation"""
        start_time = time.time()
        
        try:
            # Validate input
            if not self._validate_input(request_data):
                return "Compliance validation required for processing."
            
            # Extract context
            context = self._extract_context(request_data)
            message = context['message']
            session_id = context['session_id']
            
            # Comprehensive compliance check
            compliance_assessment = self._assess_compliance(message, context)
            
            # Content safety validation
            safety_assessment = self._validate_content_safety(message, context)
            
            # Generate compliance recommendations
            recommendations = self._generate_compliance_recommendations(
                compliance_assessment, safety_assessment, context
            )
            
            # Create audit trail entry
            audit_entry = self._create_audit_entry(
                session_id, compliance_assessment, safety_assessment, recommendations
            )
            self._log_audit_entry(audit_entry)
            
            # Record performance
            response_time = time.time() - start_time
            self._record_request(response_time, True)
            
            return self._format_compliance_response(recommendations)
            
        except Exception as e:
            response_time = time.time() - start_time
            self._record_request(response_time, False)
            return self._handle_compliance_error(e, request_data)
    
    def _assess_compliance(self, message: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Comprehensive compliance assessment across all frameworks"""
        message_lower = message.lower()
        
        # HIPAA assessment
        hipaa_assessment = self._assess_hipaa_compliance(message_lower)
        
        # GDPR assessment
        gdpr_assessment = self._assess_gdpr_compliance(message_lower)
        
        # Ethical guidelines assessment
        ethical_assessment = self._assess_ethical_compliance(message_lower)
        
        # Calculate overall compliance score
        compliance_score = self._calculate_compliance_score(
            hipaa_assessment, gdpr_assessment, ethical_assessment
        )
        
        return {
            'hipaa': hipaa_assessment,
            'gdpr': gdpr_assessment,
            'ethical': ethical_assessment,
            'overall_score': compliance_score,
            'requires_action': compliance_score < 0.8,
            'high_risk_areas': self._identify_high_risk_areas(
                hipaa_assessment, gdpr_assessment, ethical_assessment
            )
        }
    
    def _assess_hipaa_compliance(self, message: str) -> Dict[str, Any]:
        """Assess HIPAA compliance requirements"""
        violations = {}
        risk_level = 'low'
        
        for category, config in self.hipaa_compliance.items():
            identifiers = config['identifiers']
            detected = [identifier for identifier in identifiers if identifier in message]
            
            if detected:
                violations[category] = {
                    'detected_elements': detected,
                    'risk_level': config['risk_level'],
                    'required_action': config['action'],
                    'severity': len(detected) / len(identifiers)
                }
                
                if config['risk_level'] == 'high':
                    risk_level = 'high'
                elif config['risk_level'] == 'medium' and risk_level != 'high':
                    risk_level = 'medium'
        
        return {
            'violations': violations,
            'risk_level': risk_level,
            'compliant': len(violations) == 0,
            'required_disclaimers': self._determine_required_disclaimers(violations)
        }
    
    def _assess_gdpr_compliance(self, message: str) -> Dict[str, Any]:
        """Assess GDPR compliance requirements"""
        personal_data_detected = {}
        
        for data_type, config in self.gdpr_compliance.items():
            if 'identifiers' in config:
                identifiers = config['identifiers']
                detected = [identifier for identifier in identifiers if identifier in message]
                
                if detected:
                    personal_data_detected[data_type] = {
                        'detected_elements': detected,
                        'risk_level': config['risk_level'],
                        'required_action': config['action']
                    }
        
        return {
            'personal_data_detected': personal_data_detected,
            'requires_consent_notice': len(personal_data_detected) > 0,
            'data_protection_required': any(
                data['risk_level'] == 'high' for data in personal_data_detected.values()
            ),
            'retention_compliance': True  # Simplified for demo
        }
    
    def _assess_ethical_compliance(self, message: str) -> Dict[str, Any]:
        """Assess ethical guidelines compliance"""
        ethical_concerns = {}
        
        for category, config in self.ethical_guidelines.items():
            for subcategory, indicators in config.items():
                if isinstance(indicators, list):
                    detected = [indicator for indicator in indicators if indicator in message]
                    
                    if detected:
                        ethical_concerns[f"{category}_{subcategory}"] = {
                            'detected_elements': detected,
                            'risk_level': config['risk_level'],
                            'required_action': config['action'],
                            'category': category
                        }
        
        return {
            'concerns': ethical_concerns,
            'requires_intervention': any(
                concern['risk_level'] == 'high' for concern in ethical_concerns.values()
            ),
            'boundary_reminders_needed': 'professional_boundaries' in str(ethical_concerns),
            'cultural_sensitivity_needed': 'cultural_sensitivity' in str(ethical_concerns)
        }
    
    def _validate_content_safety(self, message: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Validate content safety across all categories"""
        message_lower = message.lower()
        safety_violations = {}
        overall_risk = 'low'
        
        for category, config in self.content_safety.items():
            category_violations = {}
            
            for subcategory, indicators in config.items():
                if isinstance(indicators, list):
                    detected = [indicator for indicator in indicators if indicator in message_lower]
                    
                    if detected:
                        category_violations[subcategory] = {
                            'detected_elements': detected,
                            'severity': len(detected) / len(indicators)
                        }
            
            if category_violations:
                safety_violations[category] = {
                    'violations': category_violations,
                    'risk_level': config['risk_level'],
                    'required_action': config['action']
                }
                
                # Update overall risk level
                if config['risk_level'] == 'critical':
                    overall_risk = 'critical'
                elif config['risk_level'] == 'high' and overall_risk != 'critical':
                    overall_risk = 'high'
                elif config['risk_level'] == 'medium' and overall_risk in ['low']:
                    overall_risk = 'medium'
        
        return {
            'violations': safety_violations,
            'overall_risk': overall_risk,
            'safe_content': len(safety_violations) == 0,
            'requires_blocking': overall_risk == 'critical',
            'requires_moderation': overall_risk in ['critical', 'high']
        }
    
    def _generate_compliance_recommendations(self, compliance_assessment: Dict[str, Any],
                                           safety_assessment: Dict[str, Any],
                                           context: Dict[str, Any]) -> Dict[str, Any]:
        """Generate actionable compliance recommendations"""
        recommendations = {
            'required_actions': [],
            'disclaimers': [],
            'content_modifications': [],
            'escalation_needed': False,
            'block_response': False
        }
        
        # Safety-based recommendations
        if safety_assessment['requires_blocking']:
            recommendations['block_response'] = True
            recommendations['required_actions'].append('Block unsafe content')
            recommendations['escalation_needed'] = True
        
        # HIPAA-based recommendations
        hipaa_violations = compliance_assessment['hipaa']['violations']
        for violation_type, details in hipaa_violations.items():
            action = details['required_action']
            if action == 'add_disclaimer':
                recommendations['disclaimers'].append(self.medical_disclaimers['general'])
            elif action == 'redact_and_warn':
                recommendations['content_modifications'].append('Redact PHI information')
                recommendations['disclaimers'].append(self.medical_disclaimers['general'])
        
        # Add crisis disclaimer if needed
        crisis_indicators = ['crisis', 'emergency', 'suicide', 'harm']
        if any(indicator in context['message'].lower() for indicator in crisis_indicators):
            recommendations['disclaimers'].append(self.medical_disclaimers['crisis'])
        
        # GDPR-based recommendations
        if compliance_assessment['gdpr']['requires_consent_notice']:
            recommendations['required_actions'].append('Add data protection notice')
        
        # Ethical guidelines recommendations
        ethical_concerns = compliance_assessment['ethical']['concerns']
        for concern_type, details in ethical_concerns.items():
            action = details['required_action']
            if action == 'boundary_reminder':
                recommendations['content_modifications'].append('Add professional boundary reminder')
            elif action == 'cultural_correction':
                recommendations['content_modifications'].append('Address cultural sensitivity')
        
        return recommendations
    
    def _create_audit_entry(self, session_id: str, compliance_assessment: Dict[str, Any],
                           safety_assessment: Dict[str, Any], recommendations: Dict[str, Any]) -> Dict[str, Any]:
        """Create comprehensive audit trail entry"""
        entry_id = hashlib.md5(f"{session_id}{datetime.utcnow().isoformat()}".encode()).hexdigest()[:8]
        
        return {
            'entry_id': entry_id,
            'session_id': session_id,
            'timestamp': datetime.utcnow().isoformat(),
            'compliance_assessment': compliance_assessment,
            'safety_assessment': safety_assessment,
            'recommendations': recommendations,
            'agent_version': self.agent_version,
            'processing_time_ms': 0  # Will be updated
        }
    
    def _log_audit_entry(self, audit_entry: Dict[str, Any]):
        """Log audit entry for compliance tracking"""
        self.audit_trail.append(audit_entry)
        
        # Log high-risk entries
        if (audit_entry['safety_assessment']['overall_risk'] in ['critical', 'high'] or
            audit_entry['compliance_assessment']['overall_score'] < 0.6):
            logger.warning(f"HIGH-RISK COMPLIANCE EVENT: {audit_entry['entry_id']}")
        
        # Keep audit trail manageable (last 1000 entries)
        if len(self.audit_trail) > 1000:
            self.audit_trail = self.audit_trail[-1000:]
    
    def _format_compliance_response(self, recommendations: Dict[str, Any]) -> str:
        """Format compliance recommendations into response"""
        if recommendations['block_response']:
            return (
                "⚠️ CONTENT BLOCKED: This request contains content that violates safety guidelines. "
                "Please rephrase your request or contact support if you believe this is an error."
            )
        
        response_parts = []
        
        # Required actions
        actions = recommendations['required_actions']
        if actions:
            response_parts.append("Compliance Actions Required:")
            response_parts.extend([f"• {action}" for action in actions])
        
        # Content modifications
        modifications = recommendations['content_modifications']
        if modifications:
            response_parts.append("Content Guidelines:")
            response_parts.extend([f"• {mod}" for mod in modifications])
        
        # Add disclaimers
        disclaimers = recommendations['disclaimers']
        if disclaimers:
            response_parts.extend(disclaimers)
        
        # Default compliance confirmation
        if not response_parts:
            response_parts.append("✅ Content approved for safety and compliance standards.")
        
        return "\n".join(response_parts)
    
    def _handle_compliance_error(self, error: Exception, request_data: Dict[str, Any]) -> str:
        """Handle compliance processing errors"""
        logger.error(f"MAC compliance error: {error}")
        
        # Always err on the side of caution
        return (
            "⚠️ COMPLIANCE SYSTEM ERROR: Unable to validate content safety. "
            "For your protection, please ensure your request complies with platform guidelines. "
            "If you're in crisis, call 988 or text HOME to 741741."
        )
    
    def _calculate_compliance_score(self, hipaa: Dict, gdpr: Dict, ethical: Dict) -> float:
        """Calculate overall compliance score"""
        hipaa_score = 1.0 if hipaa['compliant'] else 0.5
        gdpr_score = 1.0 if not gdpr['requires_consent_notice'] else 0.7
        ethical_score = 1.0 if not ethical['requires_intervention'] else 0.6
        
        return (hipaa_score * 0.4 + gdpr_score * 0.3 + ethical_score * 0.3)
    
    def _identify_high_risk_areas(self, hipaa: Dict, gdpr: Dict, ethical: Dict) -> List[str]:
        """Identify high-risk compliance areas"""
        high_risk = []
        
        if hipaa['risk_level'] == 'high':
            high_risk.append('HIPAA_PHI_EXPOSURE')
        
        if gdpr['data_protection_required']:
            high_risk.append('GDPR_PERSONAL_DATA')
        
        if ethical['requires_intervention']:
            high_risk.append('ETHICAL_GUIDELINES_VIOLATION')
        
        return high_risk
    
    def _determine_required_disclaimers(self, violations: Dict) -> List[str]:
        """Determine which disclaimers are required"""
        required = []
        
        for violation_type, details in violations.items():
            if 'medical_advice' in violation_type:
                required.append('medical')
            elif 'health_guidance' in violation_type:
                required.append('general')
        
        return required
    
    def get_audit_summary(self) -> Dict[str, Any]:
        """Get audit trail summary for compliance reporting"""
        if not self.audit_trail:
            return {'total_entries': 0, 'compliance_rate': 1.0}
        
        total_entries = len(self.audit_trail)
        high_risk_entries = sum(1 for entry in self.audit_trail 
                               if entry['safety_assessment']['overall_risk'] in ['critical', 'high'])
        
        compliance_rate = (total_entries - high_risk_entries) / total_entries
        
        return {
            'total_entries': total_entries,
            'high_risk_entries': high_risk_entries,
            'compliance_rate': compliance_rate,
            'last_audit': self.audit_trail[-1]['timestamp'] if self.audit_trail else None
        }
    
    def calculate_confidence(self, request_data: Dict[str, Any]) -> float:
        """Calculate confidence for compliance-related requests"""
        # MAC has moderate confidence for all requests as compliance is always relevant
        return 0.7