
from d9_python.d9_chain.chain_interface import D9Interface
from d9_chain.pallets.voting import VotingQueries
from substrateinterface import SubstrateInterface
from substrateinterface import Keypair
from d9_chain.pallets.balances import BalancesQueries

class D9Api:
     def __init__(self,chain_conn:SubstrateInterface):
          self.voting = VotingQueries(chain_conn)
          self.balances = BalancesQueries(chain_conn)

     def create_new_key_pair(self):
         mnemonic = Keypair.generate_mnemonic() 
         return Keypair.create_from_mnemonic(mnemonic)

     def key_pair_from_seed(self, seed:str):
          return Keypair.create_from_seed(seed)
     
     def key_pair_from_mnemonic(self, mnemonic:str):
          return Keypair.create_from_mnemonic(mnemonic) 

     def key_pair_from_uri(self, uri:str):
          return Keypair.create_from_uri(uri)
     
          