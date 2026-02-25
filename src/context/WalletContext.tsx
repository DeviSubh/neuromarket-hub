import React, { createContext, useContext, useState, useCallback } from "react";

interface WalletContextType {
  connected: boolean;
  address: string;
  connect: () => void;
  disconnect: () => void;
  showConnectModal: boolean;
  setShowConnectModal: (v: boolean) => void;
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  address: "",
  connect: () => {},
  disconnect: () => {},
  showConnectModal: false,
  setShowConnectModal: () => {},
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const address = "0x3a9f...c82d";

  const connect = useCallback(() => {
    setConnected(true);
    setShowConnectModal(false);
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
  }, []);

  return (
    <WalletContext.Provider value={{ connected, address, connect, disconnect, showConnectModal, setShowConnectModal }}>
      {children}
    </WalletContext.Provider>
  );
};
