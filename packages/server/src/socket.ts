import { Connection, PublicKey } from "@solana/web3.js";

(async () => {
  const publicKey = new PublicKey(
    "5KTxCq3Q3YbecCJXqwSLjCAN6EtuCzCWYhnygsTgX3vJ"
  );
  const connection = new Connection(process.env.RPC_URL as string, {
    wsEndpoint: process.env.WS_URL,
  });

  connection.onAccountChange(
    publicKey,
    (updateInfo, context) =>
      console.log("Updated account info: ", updateInfo),
    "confirmed"
  );
})();
