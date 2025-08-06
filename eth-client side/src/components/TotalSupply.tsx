import { useReadContract } from "wagmi";
import { ABI } from "../abi";

export default function TotalSupply() {
  const { data, isLoading } = useReadContract({
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    abi: ABI,
    functionName: "totalSupply",
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Total Supply</h2>
      <p>Total Supply: {data ? data.toString() : "Error fetching total supply"}</p>
    </div>
  );
}
