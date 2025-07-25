import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export default function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState<number | 0>();

  const sendAirdropToUser = async () => {
    if (!wallet.publicKey) {
      console.error("Wallet not connected");
      return;
    }
    if (amount === undefined || amount <= 0) {
      console.error("Invalid amount");
      return;
    }
    await connection.requestAirdrop(wallet.publicKey, amount * 1000000000);
    alert("Airdrop sent!");
  };
  return (
    <div>
      <input
        type="text"
        name="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={sendAirdropToUser}>Send Airdrop</button>
    </div>
  );
}
