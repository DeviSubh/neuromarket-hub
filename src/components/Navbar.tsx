import { Link, useLocation } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";

const navLinks = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/upload", label: "List Dataset" },
  { to: "/dashboard", label: "Dashboard" },
];

const Navbar = () => {
  const location = useLocation();
  const { connected, address, setShowConnectModal, disconnect } = useWallet();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-1.5">
          <span className="text-teal text-base">⬡</span>
          <span className="font-sans font-semibold text-[15px] text-foreground tracking-tight">NEUROMARKET</span>
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-sans text-sm transition-colors ${
                location.pathname === link.to
                  ? "text-foreground border-b-2 border-teal pb-0.5"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          {connected ? (
            <button
              onClick={disconnect}
              className="font-mono text-xs text-foreground border border-border rounded-[5px] px-3 py-1.5 hover:border-teal hover:text-teal transition-colors"
            >
              {address}
            </button>
          ) : (
            <button
              onClick={() => setShowConnectModal(true)}
              className="font-sans text-sm text-foreground border border-border rounded-[5px] px-4 py-1.5 hover:border-teal hover:text-teal transition-colors"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
