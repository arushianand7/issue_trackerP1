'use client';

import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  sublabel?: string;
  heightClass?: string;
  colorClass?: string;
}

export default function ProgressBar({
  progress,
  label,
  sublabel,
  heightClass = 'h-2.5',
  colorClass = 'bg-zinc-900',
}: ProgressBarProps) {
  const normalized = Math.min(100, Math.max(0, Math.round(progress || 0)));

  return (
    <div className="w-full">
      {(label || sublabel) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-medium text-zinc-600">
          <span>{label}</span>
          <span>{sublabel ?? `${normalized}%`}</span>
        </div>
      )}
      <div className={`w-full bg-zinc-100 rounded-full overflow-hidden ${heightClass}`}>
        <div
          className={`${colorClass} ${heightClass} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${normalized}%` }}
        />
      </div>
    </div>
  );
}