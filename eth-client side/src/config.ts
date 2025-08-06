import { http, createConfig, injected } from "wagmi";
import { mainnet } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet],
  connectors:[
    injected(),
  ],
  transports: {
    [mainnet.id]: http(
      "https://eth-mainnet.g.alchemy.com/v2/3rfmMavadnzN8nDMYPCHgAviwLd4FSDs"
    ),
  },
});
