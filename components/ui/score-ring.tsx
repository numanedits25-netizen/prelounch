"use client";
import { motion } from "framer-motion";

export function ScoreRing({ value, size = 64, stroke = 6, label = true, delay = 0 }: { value: number; size?: number; stroke?: number; label?: boolean; delay?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color = value >= 75 ? "#22d3ee" : value >= 50 ? "#a78bfa" : "#64748b";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <motion.circle
          key={value}
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (value / 100) * c }}
          transition={{ duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      {label ? (
        <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold text-white" style={{ fontSize: size * 0.26 }}>
          {value}
        </span>
      ) : null}
    </div>
  );
}
