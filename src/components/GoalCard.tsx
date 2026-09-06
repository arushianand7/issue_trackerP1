'use client';

import React from 'react';
import { GoalType } from '@/context/AppContext';
import Countdown from './Countdown';
import ProgressBar from './ProgressBar';
import { Calendar, FileText } from 'lucide-react';

interface GoalCardProps {
  goal: GoalType;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const start = new Date(`${goal.startDate}T${goal.startTime || '00:00'}:00`).getTime();
  const end = new Date(`${goal.endDate}T${goal.endTime || '23:59'}:00`).getTime();
  const now = new Date().getTime();

  const totalDurationMs = Math.max(0, end - start);
  const elapsedMs = Math.max(0, now - start);
  const progress = totalDurationMs === 0 ? 0 : Math.min(100, Math.round((elapsedMs / totalDurationMs) * 100));

  const totalDays = Math.ceil(totalDurationMs / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
        <div>
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Active Goal</span>
          <h2 className="text-xl font-bold text-zinc-900 mt-0.5">{goal.title}</h2>
          {goal.description && <p className="text-sm text-zinc-500 mt-1">{goal.description}</p>}
        </div>
        <Countdown endDateStr={goal.endDate} endTimeStr={goal.endTime} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3.5 bg-zinc-50 rounded-lg border border-zinc-200/70">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase">
            <Calendar className="w-3.5 h-3.5" /> Start Date
          </div>
          <p className="text-sm font-semibold text-zinc-800 mt-1">
            {goal.startDate} {goal.startTime && `at ${goal.startTime}`}
          </p>
          {goal.startNote && (
            <p className="text-xs text-zinc-500 italic mt-1.5 flex items-start gap-1">
              <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>&ldquo;{goal.startNote}&rdquo;</span>
            </p>
          )}
        </div>

        <div className="p-3.5 bg-zinc-50 rounded-lg border border-zinc-200/70">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase">
            <Calendar className="w-3.5 h-3.5" /> End Date
          </div>
          <p className="text-sm font-semibold text-zinc-800 mt-1">
            {goal.endDate} {goal.endTime && `at ${goal.endTime}`}
          </p>
          {goal.endNote && (
            <p className="text-xs text-zinc-500 italic mt-1.5 flex items-start gap-1">
              <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>&ldquo;{goal.endNote}&rdquo;</span>
            </p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <div className="flex justify-between items-center text-xs text-zinc-500 mb-1.5 font-medium">
          <span>Goal Timeline Progress ({totalDays} Days Total)</span>
          <span>{progress}% Time Elapsed</span>
        </div>
        <ProgressBar progress={progress} heightClass="h-2" />
      </div>
    </div>
  );
}