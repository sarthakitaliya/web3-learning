import "./App.css";
import { createConfig, http, injected, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EthSend from "./components/EthSend";
import WalletConnector from "./components/WalletConnector";
import MyAccount from "./components/MyAccount";
import ReadContract from "./components/ReadContract";

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
});

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <EthSend />
        <MyAccount />
        <ReadContract />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
