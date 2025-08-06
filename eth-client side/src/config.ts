import { http, createConfig, injected } from "wagmi";
import { mainnet } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet],
  connectors:[
    injected(),
  ],
  transports: { 
    [mainnet.id]: http(
      import.meta.env.VITE_ETH_PROVIDER_URL
    ),
  },
});
