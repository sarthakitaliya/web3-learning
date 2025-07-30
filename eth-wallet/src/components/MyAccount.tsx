import { useAccount, useBalance } from "wagmi";


export default function MyAccount() {
    const { address, isConnected } = useAccount();
    const balance = useBalance({ address });
    return (
      <div>
        {isConnected ? (
          <div>
            <h2>My Account</h2>
            <p>Address: {address}</p>
            <p>Balance: {balance.data ? `${balance.data.formatted} ETH` : "Loading..."}</p>
          </div>
        ) : (
          <p>Please connect your wallet</p>
        )}
      </div>
    );
}
  