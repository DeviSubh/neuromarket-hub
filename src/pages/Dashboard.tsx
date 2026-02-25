import { useState } from "react";
import { useWallet } from "@/context/WalletContext";

const myListings = [
  { name: "Sleep Study Alpha-001", type: "Sleep EEG", price: 0.45, sales: 12, earned: 0.09 },
  { name: "Motor Imagery Beta", type: "Motor", price: 0.30, sales: 8, earned: 0.00 },
];

const purchased = [
  { name: "P300 Speller BCI v2", date: "Feb 18, 2026", status: "ready" },
  { name: "Cognitive Load #7", date: "Feb 20, 2026", status: "decrypting" },
];

const stats = [
  { label: "TOTAL EARNED", value: "0.09 tFIL", amber: true },
  { label: "DATASETS LISTED", value: "2" },
  { label: "PURCHASED", value: "2" },
  { label: "TOTAL SALES", value: "20" },
];

const Dashboard = () => {
  const { connected, address, setShowConnectModal } = useWallet();
  const [activeTab, setActiveTab] = useState<"listings" | "purchased">("listings");

  if (!connected) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="font-sans text-text-secondary">Connect your wallet to view your dashboard.</p>
        <button
          onClick={() => setShowConnectModal(true)}
          className="bg-teal text-primary-foreground font-sans font-medium text-sm px-6 py-2.5 rounded-[5px]"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-10">
        {/* Wallet bar */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-[13px] text-foreground">{address}</span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-text-tertiary">
            <span className="w-1.5 h-1.5 rounded-full bg-verified inline-block" />
            Calibration Testnet
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-lg p-5">
              <p className="font-mono text-[11px] uppercase text-text-tertiary">{s.label}</p>
              <p className={`font-mono text-xl mt-1 ${s.amber ? "text-amber" : "text-foreground"}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-border pb-0">
          {(["listings", "purchased"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-sans text-sm pb-2 transition-colors ${
                activeTab === tab
                  ? "text-foreground border-b-2 border-teal"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              {tab === "listings" ? "My Listings" : "Purchased"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === "listings" ? (
            <div className="space-y-0">
              {myListings.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-4 border-b border-border-subtle">
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-sm text-foreground w-48">{item.name}</span>
                    <span className="font-mono text-xs text-text-tertiary w-24">{item.type}</span>
                    <span className="font-mono text-xs text-amber w-20">{item.price} tFIL</span>
                    <span className="font-mono text-xs text-text-tertiary w-20">{item.sales} sales</span>
                    <span className="font-mono text-xs text-text-tertiary w-28">{item.earned} tFIL earned</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase bg-verified/10 border border-verified/30 text-verified px-2 py-0.5 rounded-[3px]">
                    ACTIVE
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-0">
              {purchased.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-4 border-b border-border-subtle">
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-sm text-foreground w-48">{item.name}</span>
                    <span className="font-mono text-xs text-text-tertiary">{item.date}</span>
                  </div>
                  {item.status === "ready" ? (
                    <button className="font-sans text-xs text-teal border border-teal/30 rounded-[5px] px-3 py-1.5 hover:bg-teal/10 transition-colors">
                      Decrypt & Download
                    </button>
                  ) : (
                    <button disabled className="font-sans text-xs text-text-tertiary border border-border rounded-[5px] px-3 py-1.5 opacity-60 flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full border border-teal border-t-transparent animate-spin" />
                      Decrypting…
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
