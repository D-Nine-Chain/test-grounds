from substrateinterface.extensions import SubstrateInterface
from d9_chain import D9ChainConnection
from d9_chain.util import CurrencyDecimals, to_decimal
import os;

class D9Storage:
	def __init__(self, api:D9ChainConnection):
		self.api = api

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
