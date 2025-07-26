import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState<number | 1>();

  const sendAirdropToUser = async () => {
    if (!wallet.publicKey) {
      toast.error("Wallet not connected");
      return;
    }
    if (amount === undefined || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    toast.promise(
      connection.requestAirdrop(wallet.publicKey, amount * 1000000000),
      {
        loading: `Sending ${amount} SOL...`,
        success: () => {
          setAmount(0);
          return `Airdrop of ${amount} SOL sent to ${wallet.publicKey}`;
        },
        error: (err) => {
          return `Failed to send airdrop: ${err.message}`;
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="number"
        name="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount in SOL"
        className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
      />
      <button
        onClick={sendAirdropToUser}
        className="bg-[#512DA8] hover:bg-[#6B5B9A] text-white font-semibold px-6 py-2 rounded-md transition-colors duration-200 cursor-pointer"
      >
        Send Airdrop
      </button>
    </div>
  );
}
