import os

from d9_chain.pallets.balances import BalancesExtrinsics, BalancesQueries
from d9_chain.chain_interface import D9Interface

def init_balances():
     url = os.getenv('MAINNET_URL')
     chain_interface = D9Interface(url=url)
     return BalancesQueries(chain_interface)

balances_queries = init_balances()

def test_get_balance():
     account_balance = balances_queries.get_balance("5F1SGSsS2La8qt1qgcJ4C3UskUdTmLn3bCJndJPuCFGh4PVg")
     assert account_balance != None

def test_get_locks():
     never_locked_account = "v13n2yeidohw7TFL8f9KojG1CcTuGMnbyFxuaFacvZNYQ7U"
     account_locks = balances_queries.get_locks(never_locked_account) 
     assert len(account_locks) == 0
     # add always locked account

def init_ext_balances():
     #ext is short for extrinsics
     return BalancesExtrinsics(os.getenv('MAINNET_URL'))

balances_ext = init_ext_balances

