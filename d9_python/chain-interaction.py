import os
from dotenv import load_dotenv
load_dotenv()

from d9_chain.chain_interface import D9Interface


d9_chain_interface = D9Interface(url=os.getenv('MAINNET_URL'))

