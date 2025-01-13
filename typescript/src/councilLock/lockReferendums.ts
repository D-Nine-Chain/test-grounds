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
                    return api.query.councilLock.referendums.entries()
                    // return api.query.councilLock.referendums("wge45shM2Q5AzL49ZdmcZ77wy1ND8T27AmhW7PvKtti2WdT")
               }
          ),
          map(
               // (result) => {
               //      console.log("result ", result.toJSON())
               // }
               (entries) => {
                    return entries.map(([storageKey, codec]) => {
                         return [storageKey.toHuman(), codec.toJSON()]
                    })
               }
          )
     )
}



