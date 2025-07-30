import { useAccount, useBalance } from "wagmi";


export default function MyAccount() {
    const { address } = useAccount();
    const balance = useBalance({ address });
    return (
    <div>
      <h2>My Account</h2>
      <p>Address: {address}</p>
      <p>Balance: {balance.data ? `${balance.data.formatted} ETH` : "Loading..."}</p>
    </div>
  );
}
