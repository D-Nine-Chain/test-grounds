require("dotenv").config();
import { ApiRx, WsProvider } from "@polkadot/api";
import { map, switchMap, tap } from "rxjs/operators";
const { NETWORK_ENDPOINT } = process.env;

const someName = "name";
changeName(someName).subscribe((result) => {
  process.exit(0);
});

function changeName(newName: string) {
  return getApi$().pipe(
    switchMap((api) =>
      api.tx.d9NodeVoting.changeName(newName)
        .,
    ),
  );
}

function getApi$()
  const wsProvider = new WsProvider(NETWORK_ENDPOINT);
  const api = ApiRx.create({ provider: wsProvider });
  return api;
}
