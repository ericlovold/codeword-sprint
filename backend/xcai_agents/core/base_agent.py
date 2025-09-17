#!/usr/bin/env python3
"""
XCAi-AIIA Base Agent Class
Foundation for all XCAi-AIIA specialized agents
"""
import time
import asyncio
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, List
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class BaseAgent(ABC):
    """
    Abstract base class for all XCAi-AIIA agents
    Provides common functionality and interface
    """
    
    def __init__(self, agent_name: str, agent_version: str = "1.0.0"):
        self.agent_name = agent_name
        self.agent_version = agent_version
        self.created_at = datetime.utcnow()
        self.total_requests = 0
        self.successful_requests = 0
        self.average_response_time = 0.0
        
        # Agent capabilities
        self.capabilities = []
        self.crisis_capable = False
        self.response_time_target = 50  # ms
        
        logger.info(f"Initialized {agent_name} agent v{agent_version}")
    
    @abstractmethod
    def process(self, request_data: Dict[str, Any]) -> str:
        """
        Process a request and return a response
        Must be implemented by each agent
        """
        pass
    
    async def process_async(self, request_data: Dict[str, Any]) -> str:
        """
        Async wrapper for process method
        Can be overridden for true async implementations
        """
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, self.process, request_data)
    
    def _record_request(self, response_time: float, success: bool = True):
        """Record performance metrics for this request"""
        self.total_requests += 1
        if success:
            self.successful_requests += 1
        
        # Update rolling average response time
        if self.average_response_time == 0:
            self.average_response_time = response_time
        else:
            self.average_response_time = (self.average_response_time * 0.8) + (response_time * 0.2)
    
    def get_agent_info(self) -> Dict[str, Any]:
        """Get agent information and status"""
        return {
            'name': self.agent_name,
            'version': self.agent_version,
            'created_at': self.created_at.isoformat(),
            'capabilities': self.capabilities,
            'crisis_capable': self.crisis_capable,
            'response_time_target_ms': self.response_time_target,
            'performance': {
                'total_requests': self.total_requests,
                'successful_requests': self.successful_requests,
                'success_rate': (self.successful_requests / max(1, self.total_requests)) * 100,
                'average_response_time_ms': self.average_response_time * 1000
            }
        }
    
    def _extract_context(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract relevant context from request data"""
        return {
            'message': request_data.get('message', ''),
            'session_id': request_data.get('session_id', ''),
            'user_context': request_data.get('user_context', {}),
            'conversation_history': request_data.get('conversation_history', []),
            'timestamp': request_data.get('timestamp', datetime.utcnow().isoformat())
        }
    
    def _validate_input(self, request_data: Dict[str, Any]) -> bool:
        """Validate input data"""
        if not isinstance(request_data, dict):
            return False
        
        message = request_data.get('message', '')
        if not isinstance(message, str) or len(message.strip()) == 0:
            return False
        
        return True
    
    def _handle_error(self, error: Exception, request_data: Dict[str, Any]) -> str:
        """Handle errors gracefully"""
        logger.error(f"{self.agent_name} error: {error}")
        return f"I apologize, but I'm having difficulty processing your request right now. Please try again."

class SpecializedAgent(BaseAgent):
    """
    Enhanced base class for specialized agents with additional capabilities
    """
    
    def __init__(self, agent_name: str, specialization: str, agent_version: str = "1.0.0"):
        super().__init__(agent_name, agent_version)
        self.specialization = specialization
        self.confidence_threshold = 0.7
        self.processing_modes = ['standard', 'crisis', 'enhanced']
        self.current_mode = 'standard'
    
    def set_processing_mode(self, mode: str):
        """Set the processing mode for the agent"""
        if mode in self.processing_modes:
            self.current_mode = mode
            if mode == 'crisis':
                self.response_time_target = 5  # 5ms for crisis mode
            else:
                self.response_time_target = 50  # 50ms for standard mode
            
            logger.info(f"{self.agent_name} switched to {mode} mode")
        else:
            logger.warning(f"Invalid processing mode: {mode}")
    
    def calculate_confidence(self, request_data: Dict[str, Any]) -> float:
        """
        Calculate confidence score for handling this request
        Override in specialized agents
        """
        return 0.5  # Default neutral confidence
    
    def should_handle_request(self, request_data: Dict[str, Any]) -> bool:
        """Determine if this agent should handle the request"""
        confidence = self.calculate_confidence(request_data)
        return confidence >= self.confidence_threshold
    
    def get_specialized_info(self) -> Dict[str, Any]:
        """Get specialized agent information"""
        info = self.get_agent_info()
        info.update({
            'specialization': self.specialization,
            'confidence_threshold': self.confidence_threshold,
            'processing_modes': self.processing_modes,
            'current_mode': self.current_mode
        })
        return info