import os
from substrateinterface import SubstrateInterface
from substrateinterface import Keypair
from d9_chain.contracts.util_classes import D9Contract
from d9_chain.chain_interface import D9Interface

class USDTContarct(D9Contract):
     def __init__(self, chain_interface:D9Interface, keypair:Keypair):
          super.__init__('USDT_CONTRACT_ADDRESS','usdt.json',D9Interface(url=os.getenv('MAINNET_URL')))
          
     def approve(self, spender:str,amount:int):
          params = {
               "spender": spender,
               "value": amount
          }
          return self.execute_call('psp22::approve', params)

     def decrease_allowance(self, spender:str, delta_value:int):
          params = {
               "spender": spender,
               "delta_value": delta_value
          }
          return self.execute_call('psp22::decrease_allowance', params)

     def increase_allowance(self, spender:str, delta_value:int):
          params = {
               "spender": spender,
               "delta_value": delta_value
          }
          return self.execute_call('psp22::increase_allowance', params)

     def transfer(self, to:str, value:int):
          params = {
               "to": to,
               "value": value,
               "data": "0x"
          }
          return self.execute_call('psp22::transfer', params)

     def transfer_from(self, from_:str, to:str, value:int):
          params = {
               "from": from_,
               "to": to,
               "value": value,
               "data": "0x"
          }
          return self.execute_call('psp22::transfer_from', params)

     def balance_of(self, owner:str):
          return self.execute_call('psp22::balance_of', {'owner': owner})

     def total_supply(self):
          return self.execute_call('psp22::total_supply')