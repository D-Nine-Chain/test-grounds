require("dotenv").config();
import { switchMap, map, tap } from "rxjs/operators";
import { getApi$ } from ".";

// const account = "v13n2yeidohw7TFL8f9KojG1CcTuGMnbyFxuaFacvZNYQ7U";
const account = "wge45shM2Q5AzL49ZdmcZ77wy1ND8T27AmhW7PvKtti2WdT";
getAccountInfo().subscribe((accountInfo) => {});

function getAccountInfo() {
	return getApi$().pipe(
		switchMap((api) => {
			return api.query.system.account(account);
		}),
		tap((accountInfo) => {
			console.log("accountInfo", accountInfo.toJSON());
		}),
	);
}
