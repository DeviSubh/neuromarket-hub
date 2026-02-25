import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { datasets, datasetTypes } from "@/data/datasets";
import EEGWaveform from "@/components/EEGWaveform";

const Marketplace = () => {
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return datasets.filter((d) => {
      const matchType = activeType === "All" || d.type === activeType;
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.researcher.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [activeType, search]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-8 border-b border-border">
          <h1 className="font-sans font-semibold text-2xl text-foreground">Datasets</h1>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search datasets…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-card border border-border rounded-[5px] px-3 py-1.5 font-mono text-sm text-foreground placeholder:text-text-tertiary focus:outline-none focus:border-teal w-56"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-5 mb-8">
          {datasetTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`font-mono text-xs px-3 py-1.5 rounded-[5px] border transition-colors ${
                activeType === type
                  ? "bg-teal/15 border-teal text-teal"
                  : "bg-card border-border text-text-secondary hover:text-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((dataset, i) => (
            <motion.div
              key={dataset.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link
                to={`/dataset/${dataset.id}`}
                className="block bg-card border border-border rounded-lg overflow-hidden hover:border-teal/30 transition-colors group"
              >
                <div className="overflow-hidden">
                  <EEGWaveform variant="card" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase bg-teal/10 text-teal border border-teal/20 px-2 py-0.5 rounded-[3px]">
                      {dataset.type}
                    </span>
                    <span className="font-mono text-[10px] uppercase bg-verified/10 text-verified border border-verified/20 px-2 py-0.5 rounded-[3px]">
                      🔐 Encrypted
                    </span>
                  </div>
                  <h3 className="font-sans font-medium text-[15px] text-foreground mb-1">{dataset.name}</h3>
                  <p className="font-mono text-xs text-text-tertiary mb-2">
                    {dataset.researcher} · {dataset.institution}
                  </p>
                  <p className="font-sans text-[13px] text-text-secondary leading-relaxed line-clamp-2 mb-4">
                    {dataset.description}
                  </p>
                  <div className="border-t border-dashed border-border pt-3 mb-3">
                    <p className="font-mono text-[11px] text-text-tertiary">
                      {dataset.channels} ch · {dataset.duration} · {dataset.sampleRate} · {dataset.fileSize}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-amber">{dataset.price} tFIL</span>
                    <span className="font-sans text-xs text-teal bg-teal/10 px-3 py-1 rounded-[5px] group-hover:bg-teal/20 transition-colors">
                      Buy & Decrypt →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
