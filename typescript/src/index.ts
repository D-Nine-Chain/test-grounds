require("dotenv").config();
import { ApiRx, WsProvider, HttpProvider, ApiPromise } from "@polkadot/api";
const { HTTPS_ENDPOINT, TESTNET_WSS_ENDPOINT } = process.env;

export function getApi$() {
    const wsProvider = new WsProvider(TESTNET_WSS_ENDPOINT);
    const api = ApiRx.create({ provider: wsProvider });
    return api;
}

export function getApi() {
    const wsProvider = new WsProvider(TESTNET_WSS_ENDPOINT);
    return new ApiPromise({ provider: wsProvider });
}    