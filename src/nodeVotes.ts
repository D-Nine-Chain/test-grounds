require("dotenv").config();
import { ApiRx, WsProvider } from "@polkadot/api";
const { NETWORK_ENDPOINT } = process.env;
import { switchMap, map } from "rxjs/operators";

const userAddress = "v13n2yeidohw7TFL8f9KojG1CcTuGMnbyFxuaFacvZNYQ7U";

getVotedNodes(userAddress).subscribe((votes) => {
  console.log("收到了投票的节点和数量： ", votes);
  process.exit(0);
});

function getVotedNodes(voterId: string) {
  return getApi$().pipe(
    switchMap((api) => api.query.d9NodeVoting.userToNodeVotesTotals.entries(voterId)),
    map((entries) => {
      return entries.map(([storageKey, codec]) => {
        return {
          node: (storageKey.toHuman() as string[])[1],
          votes: codec.toJSON(),
        };
      });
    }),
  );
}

function getApi$() {
  const wsProvider = new WsProvider(NETWORK_ENDPOINT);
  const api = ApiRx.create({ provider: wsProvider });
  return api;
}
