import { useReadContract } from "wagmi";

const usdcAbi = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

export default function ReadContract() {
  const { data: balance, error, isError } = useReadContract({
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC Contract
    abi: usdcAbi,
    functionName: "balanceOf",
    args: ["0x742d35Cc6634C0532925a3b844Bc454e4438f44e"], // Example wallet address
  });

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
      <h2>Read Contract</h2>
      <p>This component will allow you to read data from a smart contract.</p>
      <p>Balance: {balance ? Number(balance) / 1e6 : "Loading..."} USDC</p>
      {isError && <p>Error: {error.message}</p>}
    </div>
  );
}
