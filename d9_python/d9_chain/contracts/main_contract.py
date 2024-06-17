import os
from substrateinterface import SubstrateInterface
from substrateinterface import Keypair
from d9_chain.contracts.util_classes import D9Contract
from d9_chain.chain_interface import D9Interface

class MainContract(D9Contract):
     def __init__(self, chain_interface:D9Interface, keypair:Keypair):
          super.__init__('MAIN_CONTRACT_ADDRESS','d9_main.json',D9Interface(url=os.getenv('MAINNET_URL')))

     def burn(self, burn_beneficiary:str, burn_contract:str, burn_amount:int):
          params = {
               "burn_beneficiary": burn_beneficiary,
               "burn_contract": burn_contract
          }
          return self.execute_call('burn', params, value=burn_amount)

     def withdraw(self, burn_contract:str):
          self.execute_call('withdraw', {'burn_contract': burn_contract})
          
     def get_ancestors(self, account_id:str):
          return self.execute_call('get_ancestors', {'account_id': account_id})

     def get_total_burned(self):
          return self.execute_call('get_total_burned')

     
          