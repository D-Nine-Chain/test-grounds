require("dotenv").config();
import { switchMap, map, tap } from "rxjs/operators";
import { getApi$ } from "..";
import { ContractRx } from "@polkadot/api-contract";
import type { WeightV2 } from '@polkadot/types/interfaces'
import { BN, BN_ONE } from "@polkadot/util";
import { usdtMetadata } from "./usdt_contract";
import { Observable } from 'rxjs';
import { ApiRx } from "@polkadot/api";
const contract = "z8keEeLwjZFK5NS5PF6xYwTHEbm7jwpH4gBYB1JV6pDTtWg"
const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
const PROOFSIZE = new BN(119903836479112);
const STORAGE_DEPOSIT_LIMIT = null;

getContractInfo().subscribe((contractInfo) => { });

function getContractInfo() {
     return getApi$().pipe(
          switchMap((api) => {
               return api.query.contracts.contractInfoOf(contract);
          })
     );
}

export function getGasLimit() {
     return getApi$().pipe(
          map((api) => {
               return api.registry.createType('WeightV2', { refTime: new BN(50_000_000_000), proofSize: new BN(800_000) }) as WeightV2;
          })
     )
}

export function getContractMetadata(contract: string) {
     switch (contract) {
          case "usdt":
               return usdtMetadata;
          default:
               throw new Error("Contract not found");
     }
}

export function getContract(name: string): Observable<ContractRx> {
     return getApi$().pipe(
          map((api: ApiRx) => {
               return new ContractRx(
                    api,
                    getContractMetadata(name),
                    getContractAddress(name) ?? "",
               );
          }),
     );
}

export function getContractAddress(name: string) {
     switch (name) {
          case "usdt":
               return process.env.USDT_CONTRACT;
          default:
               throw new Error("Contract not found");
     }
}