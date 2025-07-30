import { useConnect } from "wagmi";

export default function WalletConnector() {
  const { connectors, connect } = useConnect();
  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({ connector })}>
          Connect with {connector.name}
        </button>
      ))}
    </div>
  );
}