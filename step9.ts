import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "ton-crypto";
import { TonClient, WalletContractV4, internal } from "ton";

async function main() {
  // open wallet v4 (notice the correct wallet version here)
  const mnemonic = "unfold sugar water ..."; // your 24 secret words (replace ... with the rest of the words)
  const key = await mnemonicToWalletKey(mnemonic.split(" "));
  const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

  // initialize ton rpc client on testnet
  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });

  // send 0.001 TON to EQDrjaLahLkMB-hMCmkzOyBuHJ139ZUYmPHu6RRBKnbdLIYI
  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();
  await walletContract.sendTransfer({
    secretKey: key.secretKey,
    seqno: seqno,
    messages: [
      internal({
        to: "kQAtlolNGGRnvMLyy_CckMQk480dcVyGPjdbf-8S6dUj2RDA",
        value: "0.1", // 0.001 TON
        body: "Hello", // optional comment
        bounce: false,
      })
    ]
  });

  // wait until confirmed
  let currentSeqno = seqno;
  while (currentSeqno == seqno) {
    console.log("waiting for transaction to confirm...");
    await sleep(1500);
    currentSeqno = await walletContract.getSeqno();
  }
  console.log("transaction confirmed!");
}

main();

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}