import { getApi$ } from "..";
import { map, switchMap, tap } from "rxjs/operators";
const BN = require('bn.js');
/**
 *  Propose a lock for a given account, the method for proposeUnlock is the same
 * @param accountId 
 * @returns Observable
 */
function getMetadata() {
     return getApi$().pipe(
          map(api =>
               api.registry.findMetaError({ error: new BN(0), index: new BN(21) })
          )
     );
}

getMetadata().subscribe((response) => {
     console.log("metadata", response);

     process.exit(0);
});
