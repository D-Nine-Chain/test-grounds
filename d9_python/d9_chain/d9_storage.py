from substrateinterface.extensions import SubstrateInterface
from d9_chain import D9ChainInterface 
from d9_chain.util import CurrencyDecimals, to_decimal
import os;

class D9Storage:
	def __init__(self, chain_interface:D9ChainInterface):
		self.api = chain_interface

	def get_balance(self, account_id:str):
		"""
		gets balance from chain
		Args:
			account_id (str): account address
		Returns:
			float: balance
		"""
		result = self.api.query('System', 'Account', [account_id])

		print (result)
		return to_decimal(CurrencyDecimals.D9, result['data']['free'])
