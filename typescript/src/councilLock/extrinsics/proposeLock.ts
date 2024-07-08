import { SubmittableExtrinsic } from "@polkadot/api/types";
import { ISubmittableResult } from "@polkadot/types/types";
import { getApi$ } from "../..";
import { map, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { KeyringPair } from "@polkadot/keyring/types";

const lockIt = "v13n2yeidohw7TFL8f9KojG1CcTuGMnbyFxuaFacvZNYQ7U";
proposeLock(lockIt).subscribe((tx) => {});
/**
 *  Propose a lock for a given account, the method for proposeUnlock is the same
 * @param accountId
 * @returns Observable
 */
function proposeLock(
	accountId: string,
): Observable<SubmittableExtrinsic<"rxjs", ISubmittableResult>> {
	return getApi$().pipe(
		switchMap((api) =>
			api.query.councilLock
				.proposalFee()
				.pipe(map((proposalFee) => ({ api, proposalFee }))),
		),
		map(({ api, proposalFee }) => {
			return api.tx.councilLock.proposeLock(accountId, 0);
		}),
	);
}

function voteOnProposal(
	lockCandidate: string,
	agreeToLock: boolean,
): Observable<SubmittableExtrinsic<"rxjs", ISubmittableResult>> {
	return getApi$().pipe(
		map((api) => {
			return api.tx.councilLock.voteOnProposal(lockCandidate, agreeToLock);
		}),
	);
}

function signTransaction(keyPair: KeyringPair, transaction: SubmittableExtrinsic<"rxjs">) {
	return transaction.signAsync(keyPair);
}
