import { switchMap } from "rxjs";
import { getApi$ } from "..";

const CURRENT_SESSION = 957;
function receivedHeartbeats() {
    return getApi$().pipe(
        switchMap((api) => {
            return api.query.imOnline.receivedHeartbeats.entries(CURRENT_SESSION);
        })
    )
}

function authoredBlocks() {
    return getApi$().pipe(
        switchMap((api) => {
            return api.query.imOnline.authoredBlocks.entries(CURRENT_SESSION);
        })
    )
}

authoredBlocks().subscribe((result) => {
    console.log("authoredBlocks", result);
});
receivedHeartbeats().subscribe((result) => {
    console.log("receivedHeartbeats", result[0][1].toHuman());
    process.exit(0);
});