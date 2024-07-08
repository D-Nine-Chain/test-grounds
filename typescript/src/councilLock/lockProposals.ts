require("dotenv").config();
import { ApiRx, WsProvider } from "@polkadot/api";
const { NETWORK_ENDPOINT } = process.env;
import { switchMap, map, tap } from "rxjs/operators";

const userAddress = "v13n2yeidohw7TFL8f9KojG1CcTuGMnbyFxuaFacvZNYQ7U";
console.log("council lock test");
getLockProposals().subscribe((locProposals) => {
	console.log("收到了锁仓提案： ", locProposals);
	process.exit(0);
});

function getLockProposals(accountId?: string) {
	return getApi$().pipe(
		switchMap((api) => {
			return api.query.councilLock.lockDecisionProposals.entries();
		}),
		map((entries) => {
			return entries.map(([_, codec]) => {
				return codec.toJSON();
			});
		}),
	);
}

function getApi$() {
	const wsProvider = new WsProvider(NETWORK_ENDPOINT);
	console.log("network endpoint ", NETWORK_ENDPOINT);
	const api = ApiRx.create({ provider: wsProvider });
	return api;
}
