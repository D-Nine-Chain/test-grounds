
from d9_chain.chain_interface import D9Interface


class PalletExtrinsicsBase:
     def __init__(self, d9_interface: D9Interface, pallet_name: str):
          self.chain_interface = d9_interface
          self.pallet_name = pallet_name
          
     def compose_call(self, function_name:str, function_params:dict):
          self.chain_conn.compose_call(
               call_module=self.pallet_name,
               call_function = function_name,
               call_params=function_params
          )