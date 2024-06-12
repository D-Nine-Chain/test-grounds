
from d9_python.d9_chain.chain_interface import D9Interface
from d9_chain.pallets.voting import Voting
from substrateinterface import SubstrateInterface
from substrateinterface import Keypair
from d9_chain.pallets.balances import Balances

class KeylessD9Api:
     def __init__(self,chain_conn:SubstrateInterface):
          self.voting = Voting(chain_conn)
          self.balances = Balances(chain_conn)

          
class KeyBasedD9Api:
     def __init__(self,chain_conn:D9Interface, key_pair:Keypair):
          self.key_pair = key_pair