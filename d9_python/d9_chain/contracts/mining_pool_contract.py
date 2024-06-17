import os
from substrateinterface import SubstrateInterface
from substrateinterface import Keypair
from d9_chain.contracts.util_classes import D9Contract
from d9_chain.chain_interface import D9Interface


class MiningPoolContract(D9Contract):
     def __init__(self, chain_interface:D9Interface, keypair:Keypair):
          super.__init__('MINING_POOL_CONTRACT_ADDRESS','d9_mining_pool.json',D9Interface(url=os.getenv('MAINNET_URL')))

     def get_accumulative_reward_pool(self):
          return self.execute_call('get_accumulative_reward_pool')
     
     def get_merchant_volment(self):
          return self.execute_call('get_merchant_volment')
     
     def get_session_volume(self, session_index:int):
          return self.execute_call('get_session_volume', {'session_index': session_index})

     def get_total_volume(self):
          return self.execute_call('get_total_volume')
     
