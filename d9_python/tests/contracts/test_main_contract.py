import os

# from d9_python.d9_chain.chain_interface import D9Interface
# from substrateinterface import Keypair
# from ..main_contract import MainContract
# from d9_chain.contracts.util_classes import D9Contract


# chain_interface = D9Interface(url=os.getenv('MAINNET_URL'))
# test_keypair = Keypair.create_from_uri('//PythonTest')
# def init_main_contract():
#      return MainContract(chain_interface, test_keypair)

# def test_burn():
#      main_contract = init_main_contract()
#      burn_beneficiary = test_keypair.ss58_address
#      print("burn beneficiary ",burn_beneficiary)
#      burn_contract = os.getenv('BURN_CONTRACT')
#      burn_amount = 1000
#      # result = main_contract.burn(burn_beneficiary, burn_contract, burn_amount)
#      # assert result != None