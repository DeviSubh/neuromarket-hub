import EEGWaveform from "@/components/EEGWaveform";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  "847 datasets listed",
  "$124,320 distributed to researchers",
  "100% encrypted",
];

const features = [
  {
    label: "ENCRYPTION",
    heading: "Buyer-only decryption",
    body: "Access control enforced on-chain via Lit Protocol. Only the wallet that purchased can decrypt the file.",
  },
  {
    label: "STORAGE",
    heading: "Permanent on Filecoin",
    body: "Every dataset pinned to IPFS and stored via Filecoin deals. Verifiable CID included with every purchase.",
  },
  {
    label: "DATA QUALITY",
    heading: "PhysioNet-sourced",
    body: "Datasets sourced from validated, peer-reviewed EEG studies. Citable, annotated, research-ready.",
  },
];

const featureIcons = [
  <svg key="enc" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1a4 4 0 00-4 4v2H5a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-1V5a4 4 0 00-4-4zm-2 6V5a2 2 0 114 0v2H8zm2 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>,
  <svg key="sto" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a3 3 0 013-3h10a3 3 0 013 3v1H2V5zm0 3h16v2H2V8zm0 4h16v3a3 3 0 01-3 3H5a3 3 0 01-3-3v-3z"/></svg>,
  <svg key="qual" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>,
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center px-4"
        style={{
          minHeight: "80vh",
          background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(45, 212, 191, 0.07) 0%, transparent 70%)",
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-[11px] text-teal uppercase tracking-[0.1em] mb-6">
            FILECOIN × LIT PROTOCOL
          </p>
          <h1 className="font-sans font-semibold text-[56px] leading-[1.15] text-foreground mb-6">
            Neural data belongs
            <br />
            to researchers.
          </h1>
          <p className="font-sans text-[17px] text-text-secondary max-w-[520px] mx-auto mb-10 leading-relaxed">
            NeuroMarket is an encrypted marketplace for EEG datasets. List your data, set your price, and let verified buyers decrypt — with no middlemen.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/marketplace"
              className="bg-teal text-primary-foreground font-sans font-medium text-sm px-6 py-2.5 rounded-[5px] hover:opacity-90 transition-opacity"
            >
              Browse Datasets
            </Link>
            <Link
              to="/upload"
              className="border border-border text-foreground font-sans text-sm px-6 py-2.5 rounded-[5px] hover:border-teal hover:text-teal transition-colors"
            >
              List a Dataset
            </Link>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto mt-12 opacity-70">
          <EEGWaveform variant="hero" />
        </div>

        <div className="flex items-center gap-8 mt-10">
          {stats.map((s, i) => (
            <span key={i} className="font-mono text-xs text-text-secondary">
              {i > 0 && <span className="mr-8 text-text-tertiary">·</span>}
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="p-5"
              >
                <div className="text-teal mb-3">{featureIcons[i]}</div>
                <p className="font-mono text-[11px] text-teal uppercase tracking-[0.05em] mb-2">{f.label}</p>
                <h3 className="font-sans font-medium text-base text-foreground mb-2">{f.heading}</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
