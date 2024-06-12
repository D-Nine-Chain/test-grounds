from d9_python.d9_chain.chain_utils import D9Interface

class Balances:
     def __init__(self, chain_conn:D9Interface):
          self.chain_conn = chain_conn

     def get_balance(self, account_id:str):
          """
          gets balance from chain
          Args:
               account_id (str): account address
          Returns:
               float: balance
          """
          result = self.chain_conn.query('System', 'Account', [account_id])

          print (result)
          return result['data']['free']

          
     def get_locks(self, account_id:str):
          """
          gets locks from chain
          Args:
               account_id (str): account address
          Returns:
               list: locks
          """
          result = self.chain_conn.query('Balances', 'Locks', [account_id])
          return result.value

