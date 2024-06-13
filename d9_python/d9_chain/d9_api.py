
from d9_python.d9_chain.chain_interface import D9Interface
from d9_chain.pallets.voting import VotingQueries
from substrateinterface import SubstrateInterface
from d9_chain.pallets.balances import Balances

class D9Api:
     def __init__(self,chain_conn:SubstrateInterface):
          self.voting = VotingQueries(chain_conn)
          self.balances = Balances(chain_conn)

          
