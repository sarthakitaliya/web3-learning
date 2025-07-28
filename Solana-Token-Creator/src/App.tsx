import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";
import LaunchPad from "./components/LaunchPad";
import ConnectWallet from "./components/ConnectWallet";

function AppContent() {
  const wallet = useWallet();

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-4 border-b border-gray-700">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
      <div className="flex flex-col items-center justify-center p-4 h-[90vh]">
        {wallet.connected ? <LaunchPad /> : <ConnectWallet />}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <AppContent />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
