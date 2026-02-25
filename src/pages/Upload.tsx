import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const datasetTypeOptions = ["Sleep EEG", "Motor Imagery", "Cognitive", "P300", "SSVEP", "Clinical", "Multimodal"];

const steps = [
  "Encrypting with Lit Protocol",
  "Uploading to Filecoin",
  "Registering on FVM",
  "Listed",
];

const Upload = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (!submitting) return;
    const timers: NodeJS.Timeout[] = [];
    steps.forEach((_, i) => {
      if (i > 0) {
        timers.push(setTimeout(() => setCurrentStep(i), i * 1500));
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [submitting]);

  const done = currentStep >= steps.length - 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-10 max-w-[640px]">
        <h1 className="font-sans font-semibold text-2xl text-foreground">List a Dataset</h1>
        <p className="font-sans text-sm text-text-secondary mt-1">
          Your file will be encrypted before upload. Only buyers can decrypt.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 bg-card border border-border rounded-lg p-5 space-y-6">
          {/* Dataset Info */}
          <div>
            <p className="font-mono text-[11px] uppercase text-teal tracking-[0.05em] mb-3">DATASET INFO</p>
            <div className="space-y-3">
              <input
                required
                placeholder="Dataset Name"
                className="w-full bg-background border border-border rounded-[5px] px-3 py-2 font-sans text-sm text-foreground placeholder:text-text-tertiary focus:outline-none focus:border-teal"
              />
              <textarea
                rows={4}
                required
                placeholder="Description"
                className="w-full bg-background border border-border rounded-[5px] px-3 py-2 font-sans text-sm text-foreground placeholder:text-text-tertiary focus:outline-none focus:border-teal resize-none"
              />
              <select
                required
                className="w-full bg-background border border-border rounded-[5px] px-3 py-2 font-sans text-sm text-foreground focus:outline-none focus:border-teal"
              >
                <option value="">Select Type</option>
                {datasetTypeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Technical Specs */}
          <div>
            <p className="font-mono text-[11px] uppercase text-teal tracking-[0.05em] mb-3">TECHNICAL SPECS</p>
            <div className="grid grid-cols-3 gap-3">
              {["Channel Count", "Duration", "Sample Rate (Hz)", "File Size (MB)", "Researcher Name", "Institution"].map((label) => (
                <input
                  key={label}
                  required
                  placeholder={label}
                  className="w-full bg-background border border-border rounded-[5px] px-3 py-2 font-mono text-xs text-foreground placeholder:text-text-tertiary focus:outline-none focus:border-teal"
                />
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <p className="font-mono text-[11px] uppercase text-teal tracking-[0.05em] mb-3">PRICING</p>
            <input
              required
              type="number"
              step="0.01"
              placeholder="Price in tFIL"
              className="w-full bg-background border border-border rounded-[5px] px-3 py-2 font-mono text-sm text-foreground placeholder:text-text-tertiary focus:outline-none focus:border-teal"
            />
            <p className="font-mono text-[11px] text-text-tertiary mt-1">≈ $0.00 USD</p>
          </div>

          {/* File Upload */}
          <div>
            <p className="font-mono text-[11px] uppercase text-teal tracking-[0.05em] mb-3">FILE</p>
            <div className="bg-background border border-dashed border-border rounded-lg p-10 text-center">
              <div className="text-teal flex justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11 14.586V20h2v-5.414l3.293 3.293 1.414-1.414L12 10.758l-5.707 5.707 1.414 1.414L11 14.586z"/><path d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4h-2v4H6v-4H4z"/></svg>
              </div>
              <p className="font-sans text-sm text-text-secondary">Drop EEG file here or click to browse</p>
              <p className="font-mono text-[11px] text-text-tertiary mt-1">.edf .bdf .csv .mat .eeg · Max 100MB</p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-teal/[0.05] border-l-[3px] border-l-teal rounded-r-lg p-4">
            <p className="font-mono text-[11px] uppercase text-teal tracking-[0.05em] mb-1">ENCRYPTION PIPELINE</p>
            <p className="font-mono text-xs text-text-secondary leading-relaxed">
              File → Lit Protocol threshold encryption → Filecoin via Storacha
              <br />
              Only purchaser wallets can decrypt. You retain full ownership.
            </p>
          </div>

          {!submitting && (
            <button
              type="submit"
              className="w-full bg-teal text-primary-foreground font-sans font-medium text-sm py-2.5 rounded-[5px] hover:opacity-90 transition-opacity"
            >
              Encrypt & List
            </button>
          )}
        </form>

        {/* Progress */}
        {submitting && (
          <div className="mt-6 bg-card border border-border rounded-lg p-5">
            <div className="flex flex-col gap-4">
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
                    {step}
                  </span>
                </div>
              ))}
            </div>
            {done && (
              <div className="mt-5 pt-4 border-t border-border">
                <p className="font-mono text-xs text-text-tertiary mb-3">CID: bafybeig7q2l3...4xkp1</p>
                <button
                  onClick={() => navigate("/marketplace")}
                  className="bg-teal text-primary-foreground font-sans font-medium text-sm px-5 py-2 rounded-[5px] hover:opacity-90 transition-opacity"
                >
                  View Listing →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
