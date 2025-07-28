import { ShowSolBalance } from "./ShowSolBalance";
import { useState } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const SendTokensPage = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const sendSol = async () => {
    if (!recipient) {
      toast.error("Please enter a recipient address");
      return;
    }
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }
    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey!,
        toPubkey: new PublicKey(recipient),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    toast.promise(wallet.sendTransaction(transaction, connection), {
      success: "Transaction sent!",
      error: "Transaction failed.",
    });

    setRecipient("");
    setAmount(undefined);
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-[#2a2a2a] rounded-md shadow-lg border border-gray-700">
        <div className="flex flex-col items-center gap-4 p-6 border-b border-gray-600 relative">
          <Link
            to="/"
            className=" absolute left-5 top-5 bg-[#512DA8] hover:bg-[#6B5B9A] text-white text-sm p-2 rounded-md  cursor-pointer"
          >
            Back to Faucet
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Send Tokens</h1>
            <p className="text-sm text-gray-400">
              Use this page to send tokens to another wallet.
            </p>
          </div>
          <div className="flex gap-2 sm:flex-row flex-col">
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <input
            type="text"
            name="sendAmount"
            placeholder="To"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-2/3 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <input
            type="number"
            name="sendAmount"
            placeholder="Amount in SOL"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-2/3 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <ShowSolBalance />
          <button
            className="bg-[#512DA8] hover:bg-[#6B5B9A] text-white font-semibold px-8 py-2 rounded-md transition-colors duration-200 cursor-pointer -mt-3"
            onClick={sendSol}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendTokensPage;
