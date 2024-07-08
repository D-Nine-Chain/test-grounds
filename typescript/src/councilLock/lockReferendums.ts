require("dotenv").config();
import { switchMap, map } from "rxjs/operators";
import { getApi$ } from "..";

console.log("council lock test")
getReferendums().subscribe((concludedReferendums) => {
     console.log("active referendums", concludedReferendums);
     process.exit(0);
});

function getReferendums(sessionIndex?: number) {
     return getApi$().pipe(
          switchMap(
               (api) => {
                    return api.query.councilLock.lockReferendums.entries()
               }
          ),
          map(
               (entries) => {
                    return entries.map(([storageKey, codec]) => {
                         return [storageKey.toHuman(), codec.toJSON()]
                    })
               }
          )
     )
}



