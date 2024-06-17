import { getApi$ } from "../index";
import { switchMap, map } from "rxjs/operators";

const userAddress = "znS9gMrWUKvGAkJwWx7DybEJpgqHGPPUv1ix2QtnYXZLZu2";
console.log("council lock test")
getAccountInfo().subscribe((accountInfo) => {
     console.log("account data", accountInfo);
     process.exit(0);
});

function getAccountInfo() {
     return getApi$().pipe(
          switchMap(
               (api) => {
                    return api.query.system.account(userAddress)
               }
          ),
          map(
               (accountData) => {
                    return accountData.toJSON()
               }
          )
     )
}




