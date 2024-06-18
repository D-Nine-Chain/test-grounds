from d9_chain.chain_interface import D9Interface
from d9_chain.pallets.util_classes.pallet_base_classes import PalletExtrinsicsBase, PalletQueriesBase

class BalancesQueries(PalletQueriesBase):
     def __init__(self, chain_interface:D9Interface):
          super().__init__(chain_interface, 'Balances')

     def get_balance(self, account_id:str):
          """
          gets balance from chain
          Args:
               account_id (str): account address
          Returns:
               float: balance
          """
          result = self.chain_interface.query('System', 'Account', [account_id])
          return result['data']['free']

          
     def get_locks(self, account_id:str):
          """
          gets locks from chain
          Args:
               account_id (str): account address
          Returns:
               list: locks
          """
          result = self.compose_query('Locks', [account_id])
          print("result is ", result)
          return result.value

class BalancesExtrinsics(PalletExtrinsicsBase):
     def __init__(self, chain_interface:D9Interface):
          super().__init__(chain_interface, 'Balances')

     def transfer(self,recipient:str, amount:int):
          """
          transfer funds from one account to another
          Args:
               recipient (str): recipient account address
               amount (int): amount to transfer in base units
          Returns:
               dict: extrinsic result
          """
          result = self.compose_call('transfer', {
               'dest': recipient,
               'value': amount
          })

          return result
    