import { useWallet } from "@/context/WalletContext";

const wallets = ["MetaMask", "WalletConnect", "Coinbase Wallet"];

const WalletModal = () => {
  const { showConnectModal, setShowConnectModal, connect } = useWallet();

  if (!showConnectModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={() => setShowConnectModal(false)}>
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative bg-popover border border-border rounded-lg p-8 w-full max-w-[400px]"
        style={{ boxShadow: "0 24px 48px rgba(0,0,0,0.5)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-sans font-semibold text-lg text-foreground">Connect Wallet</h2>
        <p className="font-mono text-xs text-text-tertiary mt-1">
          Filecoin Calibration Testnet · Chain ID 314159
        </p>
        <div className="mt-6 flex flex-col gap-3">
          {wallets.map((w) => (
            <button
              key={w}
              onClick={connect}
              className="w-full text-left bg-card border border-border rounded-lg px-4 py-3.5 font-sans text-sm text-foreground hover:bg-popover transition-colors"
            >
              {w}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
