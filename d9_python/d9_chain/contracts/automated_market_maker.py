import os
from substrateinterface import SubstrateInterface
from substrateinterface import Keypair
from d9_chain.contracts.util_classes import D9Contract
from d9_chain.chain_interface import D9Interface
from d9_chain.contracts.util_classes.base_classes import Direction

class AMMContract(D9Contract):
     def __init__(self, chain_interface:D9Interface, keypair:Keypair): 
          super.__init__('CROSS_CHAIN_CONTRACT_ADDRESS','d9_cross_chain.json',D9Interface(url=os.getenv('MAINNET_URL')))
     
     def get_reserves(self):
          return self.execute_call('get_currency_reserves')

     def get_liquidity_provider(self, account_id:str):
          return self.execute_call('get_liquidity_provider', {'account_id': account_id})

     def add_liquidity(self, usdt_amount:int, d9_amount:int):
          params = {
               "usdt_liquidity": usdt_amount,
          }
          return self.execute_call('add_liquidity', params, value=d9_amount)
     
     def remove_liquidity(self):
          return self.execute_call('remove_liquidity')
     
     def check_new_liquidity(self, usdt_liquidity:int, d9_liquidity:int):
          params = {
               "usdt_liquidity": usdt_liquidity,
               "d9_liquidity": d9_liquidity
          }
          return self.execute_call('check_new_liquidity', params)

     def get_d9(self, usdt:int):
          params = {
               "usdt": usdt
          }
          return self.execute_call('get_d9', params)

     def get_usdt(self, d9_amount:int):
          return self.execute_call('get_usdt', value=d9_amount)

     def calculate_exchange(self, direction:Direction, from_amount:int):
          params = {
               "direction": direction,
               "amount_0": from_amount
          }
          return self.execute_call('calculate_exchange', params)

     def estimate_exchange(self, direction:Direction, from_amount:int):
          params = {
               "direction": direction,
               "amount_0": from_amount
          }
          return self.execute_call('estimate_exchange', params)

     def check_usdt_balance(self, account_id:str, usdt_amount:int):
          params = {
               "account_id": account_id,
               "amount": usdt_amount
          }
          return self.execute_call('check_usdt_balance', params)
    