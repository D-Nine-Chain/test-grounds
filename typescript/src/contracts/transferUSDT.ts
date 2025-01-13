import { getContract, getGasLimit } from ".";
import { switchMap, map, combineLatest, tap } from 'rxjs';
import { getApi$ } from "..";
import { ContractCallOutcome } from "@polkadot/api-contract/types";
const contractWorkerAddress = "5ENaMQbnAWfhRRkSywqxPZSaWQkcuvD3EVL5Mp7i1B2ffJb6";
function transferUSDT() {
     return combineLatest([getGasLimit(), getContract("usdt")])
          .pipe(
               switchMap(([gasLimit, contract]) => {
                    return contract.query['psp22::transfer'](
                         contractWorkerAddress,
                         {
                              gasLimit: gasLimit,
                              storageDepositLimit: null,
                         },
                         contractWorkerAddress, 1, '0x0')
               }),
               tap((result: ContractCallOutcome) => {
                    console.log("result", result.result.toHuman());
                    console.log("output", result.output?.toHuman());
               }),
               map((result) => {
                    return result.gasConsumed.toJSON();
               })
          )
}



transferUSDT().subscribe((result) => {
     console.log("gas consumed", result);
});