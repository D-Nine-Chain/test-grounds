require("dotenv").config();
import { ApiPromise, WsProvider } from "@polkadot/api";
import { ApiDecoration, DecoratedEvents } from "@polkadot/api/types";
import { BlockHash, Header } from "@polkadot/types/interfaces";
import { Codec } from "@polkadot/types/types";
const { NETWORK_ENDPOINT, AMM_CONTRACT } = process.env;
async function main() {
      // 连接到 WebSocket 端点
      const provider = new WsProvider(NETWORK_ENDPOINT);
      const api = await ApiPromise.create({ provider });

      // 订阅新块的头部
      api.rpc.chain.subscribeNewHeads((lastHeader: Header) => {
            console.log(`Block #${lastHeader.number} has been finalized`);
            const lastHeaderNumber = lastHeader.number.toNumber();
            api.rpc.chain.getBlockHash(lastHeaderNumber)
                  .then((blockHash: BlockHash) => {
                        return api.at(blockHash);
                  })
                  .then((api: ApiDecoration<"promise">) => {
                        return api.query.system.events()
                  })
                  .then((results: Codec) => {
                        const records = results.toJSON();
                        if (records) {
                              if (Array.isArray(records)) {

                                    records.forEach((record: any) => {
                                          const { event, phase } = record;
                                          console.log("event under consideration ", event)

                                    })
                              }
                        }
                  })
      });
}


main().catch(console.error);