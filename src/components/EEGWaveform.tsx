import React, { useMemo } from "react";

interface EEGWaveformProps {
  variant: "hero" | "card" | "detail";
}

function generateWaveformPoints(width: number, height: number, offset: number, freq: number): string {
  const points: string[] = [];
  const steps = 200;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const noise = Math.sin(i * freq * 0.1 + offset) * (height * 0.3)
      + Math.sin(i * freq * 0.23 + offset * 1.7) * (height * 0.15)
      + Math.sin(i * freq * 0.07 + offset * 2.3) * (height * 0.1)
      + (Math.random() - 0.5) * (height * 0.08);
    const y = height / 2 + noise;
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

const channelColors = ["#2DD4BF", "#7D90A8", "#34D399", "#FBBF24"];
const channelLabels = ["δ", "θ", "α", "β"];

const EEGWaveform: React.FC<EEGWaveformProps> = ({ variant }) => {
  const config = {
    hero: { height: 120, channels: 4, showLabels: false },
    card: { height: 56, channels: 2, showLabels: false },
    detail: { height: 160, channels: 4, showLabels: true },
  }[variant];

  const svgWidth = 1200;
  const channelHeight = config.height / config.channels;

  const waveforms = useMemo(() => {
    return Array.from({ length: config.channels }, (_, i) => ({
      points: generateWaveformPoints(svgWidth, channelHeight, i * 3.7, 1 + i * 0.3),
      color: channelColors[i],
      offsetY: i * channelHeight,
    }));
  }, [config.channels, channelHeight]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: config.height }}>
      {config.showLabels && (
        <div className="absolute left-0 top-0 z-10 flex flex-col justify-around h-full py-1" style={{ width: 24 }}>
          {channelLabels.map((label, i) => (
            <span key={i} className="font-mono text-text-tertiary text-[10px] leading-none text-center">
              {label}
            </span>
          ))}
        </div>
      )}
      <div className="animate-eeg-scroll" style={{ width: svgWidth * 2 }}>
        <svg
          width={svgWidth * 2}
          height={config.height}
          viewBox={`0 0 ${svgWidth * 2} ${config.height}`}
          preserveAspectRatio="none"
          className="opacity-60"
        >
          {waveforms.map((wf, i) => (
            <React.Fragment key={i}>
              <polyline
                points={wf.points}
                fill="none"
                stroke={wf.color}
                strokeWidth={1.2}
                transform={`translate(0, ${wf.offsetY})`}
              />
              <polyline
                points={wf.points}
                fill="none"
                stroke={wf.color}
                strokeWidth={1.2}
                transform={`translate(${svgWidth}, ${wf.offsetY})`}
              />
            </React.Fragment>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default EEGWaveform;
