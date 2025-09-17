#!/usr/bin/env python3
"""
XCAi-AIIA Multi-Agent System for Codeword
Fibonacci-scaled architecture with golden ratio coordination
"""
from .core.parallel_agent_orchestrator import orchestrator
from .agents.neo_agent import NEOAgent
from .agents.mika_agent import MIKAAgent
from .agents.nemo_agent import NEMOAgent
from .agents.echo_agent import ECHOAgent
from .agents.mac_agent import MACAgent

# Initialize and register all agents
def initialize_xcai_system(openai_client=None):
    """Initialize the complete XCAi-AIIA multi-agent system"""
    
    # Initialize agents
    neo_agent = NEOAgent(openai_client=openai_client)
    mika_agent = MIKAAgent()
    nemo_agent = NEMOAgent()
    echo_agent = ECHOAgent()
    mac_agent = MACAgent()
    
    # Register agents with orchestrator
    orchestrator.register_agent('NEO', neo_agent)
    orchestrator.register_agent('MIKA', mika_agent)
    orchestrator.register_agent('NEMO', nemo_agent)
    orchestrator.register_agent('ECHO', echo_agent)
    orchestrator.register_agent('MAC', mac_agent)
    
    return orchestrator

# Export main components
__all__ = [
    'orchestrator',
    'initialize_xcai_system',
    'NEOAgent',
    'MIKAAgent', 
    'NEMOAgent',
    'ECHOAgent',
    'MACAgent'
]