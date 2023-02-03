import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "ton";
import Counter from "./counter.step9"; // this is the interface class we just implemented

async function main() {
  // initialize ton rpc client on testnet
  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });
  //const client = new TonClient({ endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC", apiKey: "f20ff0043ded8c132d0b4b870e678b4bbab3940788cbb8c8762491935cf3a460" });

  // open Counter instance by address
  const counterAddress = Address.parse('kQAtlolNGGRnvMLyy_CckMQk480dcVyGPjdbf-8S6dUj2RDA');
  const counter = new Counter(counterAddress);
  const counterContract = client.open(counter);

  // call the getter on chain
  const counterValue = await counterContract.getCounter();
  //console.log("value:", counterValue.toString());
  console.log("value:", counterValue >= 1000000000000n ? "more than 1T" : "less than 1T");
}

main();