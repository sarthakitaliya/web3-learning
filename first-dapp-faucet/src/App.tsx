import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FaucetPage from "./components/FaucetPage";
import SendTokensPage from "./components/SendTokensPage";
import SignMessagePage from "./components/SignMessagePage";

function App() {
  const endpoint = import.meta.env.VITE_SOLANA_RPC_URL!;
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Router>
            <Routes>
              <Route path="/" element={<FaucetPage />} />
              <Route path="/sendtoken" element={<SendTokensPage />} />
              <Route path="/signmessage" element={<SignMessagePage />} />
            </Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
