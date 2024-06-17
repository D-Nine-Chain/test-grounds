
from d9_chain.chain_interface import D9Interface


class PalletExtrinsicsBase:
     """
	Voting extrinsics class to clearly demarcate the difference between
	functions that require a keypair and those that do not. these require
	a keypair
 	"""
     def __init__(self, d9_interface: D9Interface, pallet_name: str):
          self.chain_interface = d9_interface
          self.pallet_name = pallet_name

     def compose_call(self, function_name:str, function_params:dict|None = None):
          return self.chain_interface.compose_call(
               call_module=self.pallet_name,
               call_function = function_name,
               call_params=function_params
          )

          
class PalletQueriesBase:
     """
     defines the structure for all pallet interactions
     """

     def __init__(self, chain_interface: D9Interface, pallet_name: str):
          self.chain_interface = chain_interface
          self.pallet_name = pallet_name

     def compose_query(self, function_name:str, function_params:list):
          return self.chain_interface.query(
               module=self.pallet_name,
               storage_function=function_name,
               params=function_params
          )