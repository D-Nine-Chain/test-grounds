import os
from substrateinterface import Keypair
from d9_chain.contracts.util_classes import D9Contract
from d9_chain.chain_interface import D9Interface
class MerchantContract(D9Contract):
     def __init__(self, chain_interface:D9Interface, keypair:Keypair):
         super.__init__('MERCHANT_CONTRACT_ADDRESS','d9_merchant_mining.json',D9Interface(url=os.getenv('MAINNET_URL')))
     def subscribe(self,account_id:str, usdt_base_units:int):
         params = {
              "usdt_amount": usdt_base_units,
         } 
         return self.execute_call('subscribe', params, usdt_base_units)
          
     def redeem_d9(self):
          return self.execute_call('redeem_d9')

     def give_points_d9(self, consumer_id:str, d9_amount:int):
         params = {
              "consumer_id": consumer_id,
         }
         return self.execute_call('give_points_d9', params, value=d9_amount)

     def give_points_usdt(self ,consumer_id:str, usdt_amount:int):
         params = {
              "consumer_id": consumer_id,
              "usdt_payment": usdt_amount
         }
         return self.execute_call('give_points_usdt', params, value=usdt_amount)

     def send_usdt_payment_to_merchant(self, merchant_id:str, usdt_amount:int):
         params = {
              "merchant_id": merchant_id,
              "usdt_payment": usdt_amount
         }
         return self.execute_call('send_usdt_payment_to_merchant', params, value=usdt_amount)

         
     def send_d9_payment_to_merchant(self, merchant_id:str, d9_amount:int):
         params = {
              "merchant_id": merchant_id,
         }
         return self.execute_call('send_d9_payment_to_merchant', params, value=d9_amount)

     def get_merchant_expiry(self, account_id:str):
           return self.execute_call('get_expiry', {'account_id': account_id})

     def get_account(self, account_id:str):
           return self.execute_call('get_account', {'account_id': account_id})
      
     