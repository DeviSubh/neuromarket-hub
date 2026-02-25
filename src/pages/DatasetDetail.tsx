import { useParams } from "react-router-dom";
import { useState } from "react";
import { datasets } from "@/data/datasets";
import EEGWaveform from "@/components/EEGWaveform";
import PurchaseModal from "@/components/PurchaseModal";
import { useWallet } from "@/context/WalletContext";

const DatasetDetail = () => {
  const { id } = useParams();
  const dataset = datasets.find((d) => d.id === id);
  const { connected, setShowConnectModal } = useWallet();
  const [showPurchase, setShowPurchase] = useState(false);

  if (!dataset) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-mono text-text-secondary">Dataset not found.</p>
      </div>
    );
  }

  const specs = [
    ["CHANNELS", String(dataset.channels)],
    ["DURATION", dataset.duration],
    ["SAMPLE RATE", dataset.sampleRate],
    ["FORMAT", dataset.format || "EDF+"],
    ["FILE SIZE", dataset.fileSize],
    ["SUBJECTS", String(dataset.subjects || 1)],
    ["ANNOTATIONS", dataset.annotations || "—"],
    ["CID", dataset.cid || "—"],
    ["ENCRYPTION", "Lit Protocol · DatilDev"],
    ["LISTED", dataset.listed || "—"],
    ["PURCHASES", String(dataset.purchases)],
  ];

  const initials = dataset.researcher
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left 60% */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-lg p-4 overflow-hidden">
              <EEGWaveform variant="detail" />
            </div>

            <h1 className="font-sans font-semibold text-[22px] text-foreground mt-6">{dataset.name}</h1>

            <div className="flex items-center gap-2 mt-3">
              <span className="font-mono text-[10px] uppercase bg-teal/10 text-teal border border-teal/20 px-2 py-0.5 rounded-[3px]">
                {dataset.type}
              </span>
              <span className="font-mono text-[10px] uppercase bg-verified/10 text-verified border border-verified/20 px-2 py-0.5 rounded-[3px]">
                🔐 Encrypted
              </span>
            </div>

            <p className="font-sans text-sm text-text-secondary mt-3 leading-relaxed">{dataset.description}</p>

            {/* Specs */}
            <p className="font-mono text-[11px] uppercase text-teal tracking-[0.05em] mt-8 mb-3">
              TECHNICAL SPECIFICATIONS
            </p>
            <div className="border-t border-border-subtle">
              {specs.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-dashed border-border-subtle">
                  <span className="font-mono text-[11px] uppercase text-text-tertiary">{label}</span>
                  <span className="font-mono text-[13px] text-foreground">{value}</span>
                </div>
              ))}
            </div>

            {/* Researcher */}
            <p className="font-mono text-[11px] uppercase text-teal tracking-[0.05em] mt-8 mb-3">RESEARCHER</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-border flex items-center justify-center font-mono text-xs text-foreground">
                {initials}
              </div>
              <div>
                <p className="font-sans font-medium text-sm text-foreground">{dataset.researcher}</p>
                <p className="font-mono text-xs text-text-tertiary">{dataset.institution}</p>
              </div>
            </div>
          </div>

          {/* Right 40% */}
          <div className="lg:col-span-2">
            <div className="sticky top-20 bg-card border border-border rounded-lg p-6">
              <p className="font-mono text-[11px] uppercase text-text-tertiary">PRICE</p>
              <p className="font-mono font-semibold text-[28px] text-amber mt-1">{dataset.price} tFIL</p>
              <p className="font-mono text-xs text-text-tertiary">≈ ${(dataset.price * 0.51).toFixed(2)} USD</p>

              <div className="border-t border-border my-4" />

              <p className="font-mono text-xs text-text-tertiary">{dataset.purchases} researchers purchased</p>

              <div className="flex flex-col gap-2 mt-4">
                {[
                  ["🔐", "Lit Protocol encrypted"],
                  ["✓", "Filecoin verified"],
                  ["📡", "PhysioNet source"],
                ].map(([icon, label]) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 bg-teal/[0.08] border border-teal/20 rounded px-3 py-1.5"
                  >
                    <span className="text-xs">{icon}</span>
                    <span className="font-mono text-[11px] text-teal">{label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => connected ? setShowPurchase(true) : setShowConnectModal(true)}
                className="w-full mt-5 bg-teal text-primary-foreground font-sans font-medium text-sm py-2.5 rounded-[5px] hover:opacity-90 transition-opacity"
              >
                {connected ? `Purchase · ${dataset.price} tFIL` : "Connect Wallet to Purchase"}
              </button>

              <p className="font-mono text-[11px] text-text-tertiary text-center mt-3 leading-relaxed">
                Payment via Filecoin FVM. Decryption key released to buyer wallet only.
              </p>
            </div>
          </div>
        </div>
      </div>

      <PurchaseModal
        open={showPurchase}
        onClose={() => setShowPurchase(false)}
        datasetName={dataset.name}
        price={dataset.price}
      />
    </div>
  );
};

export default DatasetDetail;
