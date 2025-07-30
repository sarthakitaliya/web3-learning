import { useState } from "react";
import { useSendTransaction, type BaseError } from "wagmi";

export default function EthSend() {
  const { data, sendTransaction, isPending, isError, error } = useSendTransaction();
  const [address, setAddress] = useState<`0x${string}`>("0x");

  const handleSendTransaction = () => {
    sendTransaction({
      to: address,
      value: BigInt(0.1 * 10 ** 18), // Sending 0.1 ETH
    });
  };

  return (
    <div>
      <input type="text" placeholder="Address.." value={address} onChange={(e) => setAddress(e.target.value as `0x${string}`)} />
      <button onClick={handleSendTransaction}>Send 0.1 ETH</button>
      {isPending && <p>Sending...</p>}
      {isError && <p>Error sending transaction : {(error as BaseError).shortMessage || error.message}</p>}
      {data && <p>Transaction Hash: {data}</p>}
    </div>
  );
}
