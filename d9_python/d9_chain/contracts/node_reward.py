import os
from substrateinterface import SubstrateInterface
from substrateinterface import Keypair
from d9_chain.contracts.util_classes import D9Contract
from d9_chain.chain_interface import D9Interface
from d9_chain.contracts.util_classes.base_classes import Direction

class NodeRewardContract(D9Contract):
     def __init__(self, chain_interface:D9Interface, keypair:Keypair):
          super.__init__('NODE_REWARD_CONTRACT_ADDRESS','d9_node_reward.json',D9Interface(url=os.getenv('MAINNET_URL')))
          
     def get_vote_limit(self):
          return self.execute_call('get_vote_limit')
     
     def withdraw_reward(self, node_id:str):
          return self.execute_call('withdraw_reward', {'node_id': node_id})
     
     def get_session_rewards_data(self, session_index:int):
          return self.execute_call('get_session_rewards_data', {'session_index': session_index})
     
     def get_node_rewards_data(self, node_id:str):
          return self.execute_call('get_node_rewards_data', {'node_id': node_id})
     
     def set_authorized_receiver(self, node_id:str, receiver_id:str):
          return self.execute_call('set_authorized_receiver', {'node_id': node_id, 'receiver': receiver_id})

     def remove_authorized_receiver(self, node_id:str):
          return self.execute_call('remove_authorized_receiver', {'node_id': node_id})
     
     