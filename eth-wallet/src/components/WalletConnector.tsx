import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function WalletConnector() {
  const { connectors, connect } = useConnect();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <div>
      {isConnected ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : (
        connectors.map((connector) => (
          <button key={connector.id} onClick={() => connect({ connector })}>
            Connect with {connector.name}
          </button>
        ))
      )}
    </div>
  );
}
