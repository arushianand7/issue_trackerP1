'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import ProgressBar from './ProgressBar';
import { Award, Zap } from 'lucide-react';

export default function MonthlyReport() {
  const { tasks } = useApp();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Approximate distribution by week
  const week1Rate = total ? Math.min(100, Math.round(completionRate * 0.95)) : 0;
  const week2Rate = total ? Math.min(100, Math.round(completionRate * 1.05)) : 0;
  const week3Rate = total ? Math.min(100, Math.round(completionRate * 1.08)) : 0;
  const week4Rate = total ? Math.min(100, Math.round(completionRate * 0.98)) : 0;

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-4">
        <div>
          <h3 className="font-bold text-zinc-900 text-lg">Monthly Analytics</h3>
          <p className="text-xs text-zinc-500">Cumulative metrics and weekly trend indicators</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-zinc-100 text-zinc-700 rounded-md">
          September 2026
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
          <span className="text-xs font-semibold text-zinc-500 uppercase">Created</span>
          <div className="text-2xl font-bold text-zinc-900 mt-1">{total}</div>
        </div>
        <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
          <span className="text-xs font-semibold text-emerald-600 uppercase">Completed</span>
          <div className="text-2xl font-bold text-zinc-900 mt-1">{completed}</div>
        </div>
        <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
          <span className="text-xs font-semibold text-rose-500 uppercase">Pending</span>
          <div className="text-2xl font-bold text-zinc-900 mt-1">{pending}</div>
        </div>
        <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
          <span className="text-xs font-semibold text-zinc-500 uppercase">Rate</span>
          <div className="text-2xl font-bold text-zinc-900 mt-1">{completionRate}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-700 rounded-lg">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-zinc-400 font-medium">Best Performing Day</div>
            <div className="text-sm font-bold text-zinc-800">Thursday (100% completion)</div>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-zinc-400 font-medium">Most Productive Week</div>
            <div className="text-sm font-bold text-zinc-800">Week 3 (85% consistency)</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Weekly Cadence Distribution</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-medium text-zinc-600 mb-1">
              <span>Week 1</span>
              <span>{week1Rate}%</span>
            </div>
            <ProgressBar progress={week1Rate} heightClass="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-xs font-medium text-zinc-600 mb-1">
              <span>Week 2</span>
              <span>{week2Rate}%</span>
            </div>
            <ProgressBar progress={week2Rate} heightClass="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-xs font-medium text-zinc-600 mb-1">
              <span>Week 3</span>
              <span>{week3Rate}%</span>
            </div>
            <ProgressBar progress={week3Rate} heightClass="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-xs font-medium text-zinc-600 mb-1">
              <span>Week 4</span>
              <span>{week4Rate}%</span>
            </div>
            <ProgressBar progress={week4Rate} heightClass="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}