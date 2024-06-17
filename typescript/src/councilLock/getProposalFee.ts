require("dotenv").config();
import { switchMap, map } from "rxjs/operators";
import { getApi$ } from "..";

getProposalFee().subscribe((proposalFee) => {
     console.log("proposal fee", proposalFee);
     process.exit(0);
});

function getProposalFee() {
     return getApi$().pipe(
          switchMap(
               (api) => {
                    return api.query.councilLock.proposalFee()
               }
          ),
          map(
               (feeCodec) => {
                    return feeCodec.toJSON()
               }
          )
     )
}



