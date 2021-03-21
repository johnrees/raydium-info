import Wallet from "@project-serum/sol-wallet-adapter";
import React, { useEffect, useState } from "react";

function App() {
  const [address, setAddress] = useState<string | null>();
  const [wallet, setWallet] = useState<any>();

  useEffect(() => {
    if (wallet) return;

    const providerUrl = "https://www.sollet.io";
    const _wallet = new Wallet(providerUrl);
    _wallet.on("connect", (publicKey: any) => {
      setAddress(publicKey.toBase58());
    });
    _wallet.on("disconnect", (publicKey: any) => {
      setAddress(null);
    });
    setWallet(_wallet);
  }, [wallet]);

  return (
    <div className="App">
      {address ? (
        <h1>Connected to {address}</h1>
      ) : (
        <button onClick={wallet?.connect}>Connect to Sollet</button>
      )}
    </div>
  );
}

export default App;
