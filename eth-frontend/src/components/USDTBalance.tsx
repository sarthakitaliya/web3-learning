import { useReadContract } from "wagmi";
import { ABI } from "../abi";

export default function USDTBalance() {
  const { data, isLoading } = useReadContract({
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    abi: ABI,
    functionName: "balanceOf",
    args: ["0x18E296053CbDF986196903e889b7DcA7A73882F6"],
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>USDT Balance</h2>
      <p>USDT Balance: {data ? data.toString() : "Error fetching USDT balance"}</p>
    </div>
  );
}
