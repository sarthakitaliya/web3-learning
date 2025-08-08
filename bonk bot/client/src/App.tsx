import { useState } from "react";
import {
  Transaction,
  SystemProgram,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import axios from "axios";

const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/3rfmMavadnzN8nDMYPCHgAviwLd4FSDs");

function App() {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const sendSol = async () => {
    const ix = SystemProgram.transfer({
      fromPubkey: new PublicKey("YOUR_PUBLIC_KEY_HERE"),
      toPubkey: new PublicKey(address),
      lamports: 0.01 * LAMPORTS_PER_SOL,
    });
    const { blockhash } = await connection.getLatestBlockhash();
    const tx = new Transaction().add(ix);
    tx.recentBlockhash = blockhash;
    tx.feePayer = new PublicKey("YOUR_PUBLIC_KEY_HERE");
    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,  
    });

    axios.post("/api/v1/txn/sign", {
      message: serializedTx,
      retry: false
    });
  };
  return (
    <>
      <input
        type="text"
        placeholder="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={sendSol}>Send</button>
    </>
  );
}

export default App;
