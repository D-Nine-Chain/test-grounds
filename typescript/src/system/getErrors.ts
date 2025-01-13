import { ApiRx } from "@polkadot/api";
import { MetadataLatest } from "@polkadot/types/interfaces";
import { Metadata, TypeRegistry } from "@polkadot/types";
import {
	decorateExtrinsics,
	decorateErrors,
	expandMetadata,
} from "@polkadot/types/metadata/decorate";
import { getApi$ } from "..";
import { switchMap, tap, map } from "rxjs/operators";
import { of } from "rxjs";
import { BN } from "@polkadot/util";
const util = require("util");
getError(21, 2).subscribe((errors) => {
	console.log("error", errors);
	process.exit(0);
});

function getError(moduleIndex: number | string, errorIndex: number | string) {
	return getApi$().pipe(
		switchMap((api) => {
			return api.rpc.state.getMetadata().pipe(
				switchMap((metadata) => {
					return of({ metadata: metadata, registry: api.registry });
				}),
				map(({ metadata, registry }) => {
					return expandMetadata(registry, metadata);
				}),
				map((decoratedMeta) => {
					const queryError: any = {
						index: new BN(moduleIndex),
						error: new BN(errorIndex),
					};
					const { section, name } =
						decoratedMeta.registry.findMetaError(queryError);
					return { pallet: section, error: name };
				}),
			);
		}),
	);
}
