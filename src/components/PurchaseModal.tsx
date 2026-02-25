import { useState, useEffect } from "react";

interface PurchaseModalProps {
  open: boolean;
  onClose: () => void;
  datasetName: string;
  price: number;
}

const steps = [
  "Sending tFIL to contract",
  "Confirming on Filecoin FVM",
  "Granting Lit access to wallet",
  "File decrypted — ready to download",
];

const PurchaseModal = ({ open, onClose, datasetName, price }: PurchaseModalProps) => {
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    if (!open) {
      setCurrentStep(-1);
      return;
    }
    setCurrentStep(0);
    const timers: NodeJS.Timeout[] = [];
    steps.forEach((_, i) => {
      if (i > 0) {
        timers.push(setTimeout(() => setCurrentStep(i), i * 1400));
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [open]);

  if (!open) return null;

  const done = currentStep >= steps.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative bg-popover border border-border rounded-lg p-8 w-full max-w-[440px]"
        style={{ boxShadow: "0 24px 48px rgba(0,0,0,0.5)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-sans font-semibold text-lg text-foreground">{datasetName}</h2>
        <p className="font-mono text-sm text-amber mt-1">{price} tFIL</p>

        <div className="mt-6 flex flex-col gap-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {i < currentStep ? (
                  <div className="w-4 h-4 rounded-full bg-teal flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#0E1117" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                ) : i === currentStep ? (
                  <div className="w-4 h-4 rounded-full border-2 border-teal border-t-transparent animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-border" />
                )}
              </div>
              <span className={`font-mono text-xs ${i <= currentStep ? "text-foreground" : "text-text-tertiary"}`}>
                {i === 0 ? `Sending ${price} tFIL to contract` : step}
              </span>
            </div>
          ))}
        </div>

        {done && (
          <button
            onClick={onClose}
            className="mt-6 w-full bg-teal text-primary-foreground font-sans font-medium text-sm py-2.5 rounded-[5px] hover:opacity-90 transition-opacity"
          >
            Download EEG File
          </button>
        )}
      </div>
    </div>
  );
};

export default PurchaseModal;
