import { ApiRx } from "@polkadot/api";
import {
	Observable,
	combineLatest,
	take,
	switchMap,
	BehaviorSubject,
	throwError,
	catchError,
	of,
} from "rxjs";

type Referendum = {};
class FreezeClass {
	activeAddress$: Observable<AccountId | null> = new BehaviorSubject<AccountId | null>(
		null,
	).asObservable();
	#d9 = { api$: new BehaviorSubject<ApiRx | null>(anull).asObservable() };

	voteInReferendum(lockReferendum: LockReferendum, decision: boolean): Observable<any> {
		return combineLatest([this.activeAddress$, this.#d9.api$]).pipe(
			take(1),
			switchMap(([activeAddress, api]) => {
				if (!activeAddress) {
					return throwError(() => new Error("Active address not found"));
				}
				if (!api || !api.query.councilLock) {
					return throwError(
						() => new Error("councilLock module not available in api.query"),
					);
				}
				// 判断lockReferendum中的assentingVoters或dissentinsVoters是否包含当前用户的地址
				const hasVoted =
					lockReferendum.assentingVoters.includes(activeAddress) ||
					lockReferendum.dissentingVoters.includes(activeAddress);
				if (hasVoted) {
					throw new VoteAlreadyCastError("您已投过票");
				}
				// 创建voteInReferendum交易并将其转换为Observable
				const tx = api.tx.councilLock.voteInReferendum(
					lockReferendum.proposedAccount,
					decision,
				);
				return of(tx);
			}),
			switchMap((tx) => from(this.#account.signTransaction(tx))),
			switchMap((signedTx) =>
				this.#trx.sendSignedTransaction({
					transaction: signedTx,
					mutation: "voteOnProposal",
				}),
			),
			catchError((error) => {
				if (error instanceof VoteAlreadyCastError) {
					this.showErrorAlert();
				}
				return throwError(() => error);
			}),
		);
	}
}

// Assuming SessionIndex and AccountLockState are defined elsewhere in your TypeScript code
type SessionIndex = number; // Example type
enum AccountLockState {
	Locked,
	Unlocked,
} // Example type
type AccountId = string;
// Placeholder type for bounded arrays
type BoundedVec = string[];
interface LockReferendum {
	nominator: AccountId;
	proposedAccount: AccountId;
	indexOfProposal: SessionIndex;
	changeTo: AccountLockState;
	assentingVoters: BoundedVec;
	dissentingVoters: BoundedVec;
}
