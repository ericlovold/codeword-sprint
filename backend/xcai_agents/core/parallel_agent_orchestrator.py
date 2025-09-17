#!/usr/bin/env python3
"""
XCAi-AIIA Parallel Agent Orchestrator
Fibonacci-scaled architecture with golden ratio (φ ≈ 1.618) coordination
for optimal load balancing and sub-5ms crisis response times.
"""
import time
import asyncio
from typing import Dict, List, Any, Optional
from datetime import datetime
import logging

# Golden ratio for load balancing
PHI = 1.618

logger = logging.getLogger(__name__)

class CircuitBreaker:
    """Circuit breaker for fault tolerance"""
    def __init__(self, failure_threshold=5, recovery_timeout=30):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = 'CLOSED'  # CLOSED, OPEN, HALF_OPEN
    
    def can_execute(self):
        if self.state == 'CLOSED':
            return True
        elif self.state == 'OPEN':
            if self.last_failure_time and (time.time() - self.last_failure_time) > self.recovery_timeout:
                self.state = 'HALF_OPEN'
                return True
            return False
        elif self.state == 'HALF_OPEN':
            return True
        return False
    
    def record_success(self):
        self.failure_count = 0
        self.state = 'CLOSED'
    
    def record_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        if self.failure_count >= self.failure_threshold:
            self.state = 'OPEN'

class ParallelAgentOrchestrator:
    """
    Multi-agent orchestration with Fibonacci-scaled hierarchy
    """
    
    def __init__(self):
        self.agents = {}
        self.circuit_breakers = {}
        self.performance_metrics = {}
        
        # Fibonacci weights for load balancing (golden ratio optimization)
        self.fibonacci_weights = {
            'NEO': 1,     # Primary emotional intelligence
            'ECHO': 1,    # Context and conversation history  
            'NEMO': 2,    # Cultural intelligence & equity
            'MAC': 3,     # Moderation & compliance
            'MIKA': 5,    # Crisis intervention specialist
            'ISHA': 8,    # Health data integration
            'VISION': 13  # Strategic oversight & coordination
        }
        
        # Crisis-capable agents (sub-5ms response requirement)
        self.crisis_agents = ['NEO', 'MIKA', 'MAC', 'ECHO']
        
    def register_agent(self, agent_name: str, agent_instance):
        """Register an agent with the orchestrator"""
        self.agents[agent_name] = agent_instance
        self.circuit_breakers[agent_name] = CircuitBreaker()
        self.performance_metrics[agent_name] = {
            'total_requests': 0,
            'successful_requests': 0,
            'average_response_time': 0,
            'last_request_time': None
        }
        logger.info(f"Registered agent: {agent_name}")
    
    async def orchestrate_request(self, request_data: Dict[str, Any], crisis_mode: bool = False) -> Dict[str, Any]:
        """
        Orchestrate request across multiple agents
        Crisis mode activates all crisis-capable agents simultaneously
        """
        start_time = time.time()
        
        if crisis_mode:
            # Crisis mode: activate all crisis-capable agents with 5ms timeout
            selected_agents = self.crisis_agents
            timeout = 0.005  # 5ms timeout for crisis
            logger.warning(f"CRISIS MODE ACTIVATED - agents: {selected_agents}")
        else:
            # Standard mode: intelligent agent selection
            selected_agents = self._select_agents(request_data)
            timeout = 0.050  # 50ms timeout for standard
        
        # Execute agents in parallel
        tasks = []
        for agent_name in selected_agents:
            if agent_name in self.agents and self.circuit_breakers[agent_name].can_execute():
                tasks.append(self._execute_agent(agent_name, request_data, timeout))
        
        # Wait for all agents to complete
        try:
            results = await asyncio.wait_for(asyncio.gather(*tasks, return_exceptions=True), timeout=timeout * 2)
            
            # Coordinate responses
            coordinated_response = self._coordinate_responses(results, selected_agents)
            
            # Update performance metrics
            total_time = time.time() - start_time
            self._update_metrics(selected_agents, total_time, True)
            
            return {
                'response': coordinated_response,
                'agents_used': selected_agents,
                'response_time_ms': total_time * 1000,
                'crisis_mode': crisis_mode,
                'timestamp': datetime.utcnow().isoformat()
            }
            
        except asyncio.TimeoutError:
            logger.error(f"Orchestration timeout in {'crisis' if crisis_mode else 'standard'} mode")
            self._update_metrics(selected_agents, timeout * 2, False)
            
            # Fallback response
            return {
                'response': 'I apologize, but I\'m experiencing a brief delay. Please try again.',
                'agents_used': selected_agents,
                'response_time_ms': timeout * 2000,
                'crisis_mode': crisis_mode,
                'error': 'timeout',
                'timestamp': datetime.utcnow().isoformat()
            }
    
    def _select_agents(self, request_data: Dict[str, Any]) -> List[str]:
        """Intelligent agent selection based on request analysis"""
        selected = []
        
        # Always include NEO for primary intelligence
        selected.append('NEO')
        
        # Include ECHO for context
        selected.append('ECHO')
        
        # Analyze request for specialized needs
        message = request_data.get('message', '').lower()
        
        # Cultural considerations
        cultural_indicators = ['culture', 'background', 'tradition', 'identity', 'discrimination', 'bias']
        if any(indicator in message for indicator in cultural_indicators):
            selected.append('NEMO')
        
        # Compliance and safety checks
        safety_indicators = ['legal', 'safe', 'appropriate', 'guidelines', 'policy']
        if any(indicator in message for indicator in safety_indicators):
            selected.append('MAC')
        
        # Crisis detection (MIKA already handled in crisis mode)
        crisis_indicators = ['crisis', 'emergency', 'help', 'urgent', 'desperate']
        if any(indicator in message for indicator in crisis_indicators):
            selected.append('MIKA')
        
        # Health-related requests
        health_indicators = ['health', 'medical', 'doctor', 'medication', 'symptoms']
        if any(indicator in message for indicator in health_indicators):
            selected.append('ISHA')
        
        # Complex requests need strategic oversight
        if len(selected) > 3:
            selected.append('VISION')
        
        return list(set(selected))  # Remove duplicates
    
    async def _execute_agent(self, agent_name: str, request_data: Dict[str, Any], timeout: float):
        """Execute individual agent with circuit breaker protection"""
        try:
            agent = self.agents[agent_name]
            
            # Execute agent with timeout
            if hasattr(agent, 'process_async'):
                result = await asyncio.wait_for(agent.process_async(request_data), timeout=timeout)
            else:
                # Fallback to sync execution
                result = await asyncio.wait_for(
                    asyncio.get_event_loop().run_in_executor(None, agent.process, request_data),
                    timeout=timeout
                )
            
            self.circuit_breakers[agent_name].record_success()
            return {'agent': agent_name, 'result': result, 'status': 'success'}
            
        except asyncio.TimeoutError:
            logger.warning(f"Agent {agent_name} timed out")
            self.circuit_breakers[agent_name].record_failure()
            return {'agent': agent_name, 'result': None, 'status': 'timeout'}
        except Exception as e:
            logger.error(f"Agent {agent_name} failed: {e}")
            self.circuit_breakers[agent_name].record_failure()
            return {'agent': agent_name, 'result': None, 'status': 'error', 'error': str(e)}
    
    def _coordinate_responses(self, results: List[Dict], selected_agents: List[str]) -> str:
        """Coordinate responses from multiple agents using golden ratio weighting"""
        successful_results = [r for r in results if isinstance(r, dict) and r.get('status') == 'success']
        
        if not successful_results:
            return "I apologize, but I'm having difficulty processing your request right now. Please try again."
        
        # Weight responses by Fibonacci hierarchy
        weighted_responses = []
        for result in successful_results:
            agent_name = result['agent']
            weight = self.fibonacci_weights.get(agent_name, 1)
            response_text = result['result']
            
            if response_text:
                weighted_responses.append({
                    'response': response_text,
                    'weight': weight,
                    'agent': agent_name
                })
        
        if not weighted_responses:
            return "I understand you're reaching out. Let me help you with that."
        
        # For now, return the highest-weighted response
        # In full implementation, this would intelligently blend responses
        best_response = max(weighted_responses, key=lambda x: x['weight'])
        return best_response['response']
    
    def _update_metrics(self, agents: List[str], response_time: float, success: bool):
        """Update performance metrics for agents"""
        for agent_name in agents:
            if agent_name in self.performance_metrics:
                metrics = self.performance_metrics[agent_name]
                metrics['total_requests'] += 1
                if success:
                    metrics['successful_requests'] += 1
                
                # Update average response time
                if metrics['average_response_time'] == 0:
                    metrics['average_response_time'] = response_time
                else:
                    metrics['average_response_time'] = (
                        metrics['average_response_time'] * 0.8 + response_time * 0.2
                    )
                
                metrics['last_request_time'] = datetime.utcnow().isoformat()
    
    def get_system_health(self) -> Dict[str, Any]:
        """Get overall system health and performance metrics"""
        health_data = {
            'status': 'healthy',
            'agents': {},
            'circuit_breakers': {},
            'performance': {},
            'timestamp': datetime.utcnow().isoformat()
        }
        
        for agent_name in self.agents:
            # Agent status
            health_data['agents'][agent_name] = {
                'registered': True,
                'fibonacci_weight': self.fibonacci_weights.get(agent_name, 1),
                'crisis_capable': agent_name in self.crisis_agents
            }
            
            # Circuit breaker status
            cb = self.circuit_breakers[agent_name]
            health_data['circuit_breakers'][agent_name] = {
                'state': cb.state,
                'failure_count': cb.failure_count,
                'last_failure': cb.last_failure_time
            }
            
            # Performance metrics
            health_data['performance'][agent_name] = self.performance_metrics[agent_name].copy()
        
        return health_data

# Global orchestrator instance
orchestrator = ParallelAgentOrchestrator()