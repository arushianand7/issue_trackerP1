'use client';

import React, { useEffect, useState } from 'react';
import { Timer, CheckCircle } from 'lucide-react';

interface CountdownProps {
  endDateStr: string;
  endTimeStr?: string;
}

export default function Countdown({ endDateStr, endTimeStr = '23:59' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: false });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(`${endDateStr}T${endTimeStr}:00`).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, completed: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [endDateStr, endTimeStr]);

  if (timeLeft.completed) {
    return (
      <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 text-sm font-semibold">
        <CheckCircle className="w-4 h-4" />
        <span>Goal Completed / Deadline Reached</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
        <Timer className="w-3.5 h-3.5 text-zinc-400" />
        <span>Goal Ends In</span>
      </div>
      <div className="flex items-baseline gap-2 text-zinc-900 font-mono">
        <div className="text-xl font-bold">{timeLeft.days}<span className="text-xs font-normal text-zinc-500 ml-0.5">d</span></div>
        <div className="text-xl font-bold">{String(timeLeft.hours).padStart(2, '0')}<span className="text-xs font-normal text-zinc-500 ml-0.5">h</span></div>
        <div className="text-xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}<span className="text-xs font-normal text-zinc-500 ml-0.5">m</span></div>
        <div className="text-sm font-semibold text-zinc-400">{String(timeLeft.seconds).padStart(2, '0')}s</div>
      </div>
    </div>
  );
}