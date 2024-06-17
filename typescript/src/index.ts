require("dotenv").config();
import { ApiRx, WsProvider } from "@polkadot/api";
const { NETWORK_ENDPOINT } = process.env;

export function getApi$() {
     const wsProvider = new WsProvider(NETWORK_ENDPOINT);
     const api = ApiRx.create({ provider: wsProvider });
     return api;
}