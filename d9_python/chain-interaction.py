import os
from dotenv import load_dotenv
load_dotenv()

from d9_chain.chain_interface import D9Interface
from d9_chain.d9_api import KeylessD9Api


d9_chain_connection = D9Interface(url=os.getenv('MAINNET_URL'))
d9_api = KeylessD9Api(d9_chain_connection)
total_votes = d9_api.voting.node_to_user_vote_totals(os.getenv('TEST_ACCOUNT'),"yAFBG7KfDJQkPjk43GQxbjRx2HKPM8G2LXFUsPqEbmjhgai")

print("account locks ",d9_api.balances.get_locks(os.getenv('TEST_ACCOUNT')) )





