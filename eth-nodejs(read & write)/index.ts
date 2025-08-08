import { JsonRpcProvider, id } from "ethers";

const provider = new JsonRpcProvider(process.env.ETH_PROVIDER_URL);

async function pollBlock(blockNumber: number) {
  const logs = await provider.getLogs({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    fromBlock: blockNumber,
    toBlock: blockNumber,
    topics: [id("Transfer(address,address,uint256)")],
  });

  console.log(logs);
  
}

pollBlock(23083863);