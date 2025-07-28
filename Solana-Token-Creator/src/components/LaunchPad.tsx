import { useState } from "react";

const LaunchPad = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [supply, setSupply] = useState("");

    const handleSubmit = () => {
        // Handle token creation logic here
        console.log("Token Created:", { name, symbol, imageUrl, supply });
        // Reset fields after submission
        setName("");
        setSymbol("");
        setImageUrl("");
        setSupply("");
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
      <button className="mt-4 px-5 py-3 bg-gray-600 text-white rounded-2xl cursor-pointer hover:bg-gray-500" onClick={handleSubmit}>
        Create Token
      </button>
    </div>
  );
};

export default LaunchPad;
