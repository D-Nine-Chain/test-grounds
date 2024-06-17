require("dotenv").config();
import { switchMap, map } from "rxjs/operators";
import { getApi$ } from "..";

console.log("council lock test")
getConcludedReferendums().subscribe((concludedReferendums) => {
     console.log("concluded referendums", concludedReferendums);
     process.exit(0);
});

function getConcludedReferendums(sessionIndex?: number) {
     return getApi$().pipe(
          switchMap(
               (api) => {
                    return api.query.councilLock.concludedLockReferendums.entries(sessionIndex)
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



