import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { ed25519 } from "@noble/curves/ed25519";
import { toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const SignMessagePage = () => {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState<string>("");

  const onClick = async () => {
    if (!publicKey) {
      toast.error("Please connect your wallet first.");
      return;
    }
    if (!signMessage) {
      toast.error("Wallet does not support message signing.");
      return;
    }

    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);
    const isValid = ed25519.verify(signature, encodedMessage, publicKey.toBytes());

    if (isValid) {
      toast.success("Message signed successfully!");
      console.log("Signature:", bs58.encode(signature));
      
    } else {
      toast.error("Failed to sign the message.");
    }
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
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">Sign Message</h1>
            <p className="text-sm text-gray-400">
              Sign a message with your wallet
            </p>
          </div>
          <div className="flex gap-2 sm:flex-row flex-col">
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <textarea
            placeholder="Enter message to sign"
            className="w-full p-4 border border-gray-600 bg-[#1e1e1e] text-white"
            value={message}
            rows={6}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="mt-4 bg-[#512DA8] hover:bg-[#6B5B9A] text-white font-semibold px-8 py-2 rounded-md transition-colors duration-200 cursor-pointer"
            onClick={onClick}
          >
            Sign Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignMessagePage;
