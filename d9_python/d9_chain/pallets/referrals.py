from d9_chain.chain_interface import D9Interface
from d9_chain.pallets.util_classes.pallet_base_classes import PalletExtrinsicsBase

class ReferralsQueries:
     def __init__(self, chain_conn:D9Interface):
          self.chain_conn = chain_conn

     def get_referral(self, account_id:str):
          """
          gets referral from chain
          Args:
               account_id (str): account address
          Returns:
               list: referral
          """
          result = self.chain_conn.query('Referrals', 'Referral', [account_id])
          return result.value
          
     def direct_referrals_count(self, account_id:str):
          """
          gets direct referrals count from chain
          Args:
               account_id (str): account address
          Returns:
               int: direct referrals count
          """
          result = self.chain_conn.query('D9Referral', 'DirectReferralsCount', [account_id])
          return result.value

     def max_referral_depth(self):
          """
          gets max referral depth from chain
          Returns:
               int: max referral depth
          """
          result = self.chain_conn.query('D9Referral', 'MaxReferralDepth', [])
          return result.value
     
     def get_referral_relationships(self, account_id:str):
          """
          gets referral relationships from chain
          Args:
               account_id (str): account address
          Returns:
               list: referral relationships
          """
          result = self.chain_conn.query('D9Referral', 'ReferralRelationships', [account_id])
          return result.value

class  ReferralsExtrinsics(PalletExtrinsicsBase):
     def __init__(self,chain_interface:D9Interface):
          super.__init__(chain_interface,'D9Referral')
     
     