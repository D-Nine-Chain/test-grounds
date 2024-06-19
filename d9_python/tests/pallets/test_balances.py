import os
from d9_chain.pallets.balances import BalancesExtrinsics, BalancesQueries
from d9_chain.utils.chain_interface import D9Interface
from d9_chain.keypair.d9_key_pair import D9Keypair
from substrateinterface.exceptions import SubstrateRequestException

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
     chain_interface = D9Interface(url=os.getenv('MAINNET_URL'))
     return BalancesExtrinsics(chain_interface)
 
balances_ext = init_ext_balances()

def test_transfer():
     test_keypair = D9Keypair.create_from_uri('//PythonTest')
     print("test keypair address ",test_keypair.ss58_address)
     python_tester_balance = balances_queries.get_balance(test_keypair.ss58_address)      
     print("python tester balance (in base units) ",python_tester_balance)
     test_keypair_2 = D9Keypair.create_from_uri('//PythonTest2')
     balances_ext = init_ext_balances()
     generic_call = balances_ext.transfer(test_keypair_2.ss58_address, 10000)
     chain_interface = D9Interface(url=os.getenv('MAINNET_URL'))
     signed_extrinsic = chain_interface.create_signed_extrinsic(generic_call, test_keypair)
     try:
          receipt = chain_interface.submit_extrinsic(signed_extrinsic, wait_for_inclusion=True)
          print("Extrinsic '{}' sent and included in block '{}'".format(receipt.extrinsic_hash, receipt.block_hash, receipt))
     except SubstrateRequestException as e:
          print("Failed to send: {}".format(e))
     