import {
  createInitializeAccount2Instruction,
  createInitializeMint2Instruction,
  createMint,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

const LaunchPad = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [supply, setSupply] = useState("");
  const { connection } = useConnection();
  const wallet = useWallet();

  const createToken = async () => {
    if (!wallet.publicKey) {
      console.log("Wallet not connected");
      return;
    }
    // if (!name || !symbol || !imageUrl || !supply) {
    //   console.log("Please fill in all fields");
    //   return;
    // }

    const lamports = await getMinimumBalanceForRentExemptMint(
      connection
    );
    const keyPair = Keypair.generate();

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keyPair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMint2Instruction(
        keyPair.publicKey,
        9,
        wallet.publicKey,
        wallet.publicKey,
        TOKEN_PROGRAM_ID
      )
    );
    const recentBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = recentBlockhash.blockhash;
    transaction.feePayer = wallet.publicKey;

    transaction.recentBlockhash = recentBlockhash.blockhash;
    transaction.partialSign(keyPair);
    const res = await wallet.sendTransaction(transaction, connection);
    console.log("Transaction signature", res);  
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-8">Create Your Token</h1>
      <input
        type="text"
        className="mt-2 px-4 w-full py-3 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
        placeholder="Token Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="mt-2 px-4 w-full py-3 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
        placeholder="Token Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        type="text"
        className="mt-2 px-4 w-full py-3 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        type="text"
        className="mt-2 px-4 w-full py-3 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
        placeholder="Initial Supply"
        value={supply}
        onChange={(e) => setSupply(e.target.value)}
      />
      <button
        className="mt-4 px-5 py-3 bg-gray-600 text-white rounded-2xl cursor-pointer hover:bg-gray-500"
        onClick={createToken}
      >
        Create Token
      </button>
    </div>
  );
};

export default LaunchPad;
