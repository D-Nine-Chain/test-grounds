import os
from d9_chain.chain_interface import D9Interface
from substrateinterface.contracts import ContractInstance
from substrateinterface import Keypair
from enum import Enum
class D9Contract(ContractInstance):
     def __init__(self, contract_address:str, metadata_file:str, d9_interface:D9Interface, keypair:Keypair):
          self.contract = contract = ContractInstance.create_from_address(
          contract_address=os.getenv('MERCHANT_CONTRACT_ADDRESS'),
          metadata_file=os.path.join(os.path.dirname(__file__), 'contract_metadatas', 'd9_merchant_mining.json'),
          substrate=D9Interface(url=os.getenv('MAINNET_URL'))
          )        
          self.keypair = keypair
          
     def execute_call(self, call_name:str, call_params:dict|None = None, value:int = 0):
          predicted_gas_result = self.contract.read(self.keypair,call_name)
          call = self.contract.exec(self.keypair, call_name, call_params, value)

          
class Currency(Enum):
     D9 = 0
     USDT = 1

class Direction:
    def __init__(self, from_currency: Currency, to_currency: Currency):
        self.from_currency = from_currency
        self.to_currency = to_currency

    def __eq__(self, other):
        if isinstance(other, Direction):
            return (self.from_currency == other.from_currency and
                    self.to_currency == other.to_currency)
        return False

    def __repr__(self):
        return f"Direction(from_currency={self.from_currency}, to_currency={self.to_currency})"

    def __copy__(self):
        return Direction(self.from_currency, self.to_currency)

    def __deepcopy__(self, memodict={}):
        return Direction(self.from_currency, self.to_currency)
     