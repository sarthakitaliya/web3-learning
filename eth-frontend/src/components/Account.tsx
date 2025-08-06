import { useAccount, useDisconnect } from "wagmi";

export default function Account() {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  return (
    <div>
      <h2>Account Information</h2>
      <p>Address: {address}</p>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
