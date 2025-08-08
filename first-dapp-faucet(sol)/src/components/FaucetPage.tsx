import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { ShowSolBalance } from "./ShowSolBalance";
import Airdrop from "./Airdrop";
import { Link } from "react-router-dom";

const FaucetPage = () => {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-[#2a2a2a] rounded-md shadow-lg border border-gray-700">
        <div className="flex sm:flex-row justify-between flex-col items-center gap-4 p-6 border-gray-600 relative">
          <Link
            to="/sendtoken"
            className="  bg-[#512DA8] hover:bg-[#6B5B9A] text-white text-sm p-2 rounded-md  cursor-pointer"
          >
            Go to Send Tokens
          </Link>
          <Link
            to="/signmessage"
            className=" bg-[#512DA8] hover:bg-[#6B5B9A] text-white text-sm p-2 rounded-md  cursor-pointer"
          >
            Go to Sign Message
          </Link>
        </div>
        <div className="flex flex-col items-center p-6 border-b border-gray-600">
          <h1 className="text-2xl font-bold mb-1">💦 Sol Faucet 💦</h1>
          <p className="text-sm text-gray-400 mb-4">
            This tool does{" "}
            <span className="text-red-500 font-semibold">NOT</span> give real
            $SOL or Solana tokens.
          </p>
          <div className="flex gap-2 sm:flex-row flex-col">
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
        </div>
        <main className="flex flex-col items-center p-6">
          <h2 className="text-xl font-semibold text-center">Request Airdrop</h2>
          <p className="text-sm text-gray-400 mb-4">
            Maximum of 2 requests every 8 hours
          </p>
          <ShowSolBalance />
          <Airdrop />
        </main>
      </div>
    </div>
  );
};

export default FaucetPage;
