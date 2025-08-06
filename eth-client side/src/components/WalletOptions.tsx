import { useAccount, useConnect } from "wagmi";
import Account from "./Account";

export default function WalletOptions() {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  if (isConnected) <Account />;
  return (
    <>
      {isConnected ? (
        <Account />
      ) : (
        <div>
          <h2>Connect Wallet</h2>
          {connectors.map((connector) => (
            <button key={connector.id} onClick={() => connect({ connector })}>
              {connector.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
