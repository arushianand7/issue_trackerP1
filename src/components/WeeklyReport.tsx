'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import ProgressBar from './ProgressBar';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function WeeklyReport() {
  const { tasks } = useApp();

  const dailyStats = DAYS.map((day) => {
    const dayTasks = tasks.filter((t) => {
      if (t.repeatType === 'daily') return true;
      if (t.repeatType === 'weekly') return (t.repeatDays || []).includes(day);
      return t.day === day;
    });

    const total = dayTasks.length;
    const completed = dayTasks.filter((t) => t.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { day, total, completed, remaining: total - completed, percentage };
  });

  const totalWeekly = dailyStats.reduce((acc, curr) => acc + curr.total, 0);
  const completedWeekly = dailyStats.reduce((acc, curr) => acc + curr.completed, 0);
  const weeklyPercentage = totalWeekly === 0 ? 0 : Math.round((completedWeekly / totalWeekly) * 100);

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-4">
        <div>
          <h3 className="font-bold text-zinc-900 text-lg">Weekly Performance</h3>
          <p className="text-xs text-zinc-500">Task completion aggregate across all seven days</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-semibold text-zinc-400 uppercase">Weekly Completion</span>
            <div className="text-2xl font-bold text-zinc-900">{weeklyPercentage}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
        {dailyStats.map((item) => (
          <div key={item.day} className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/80">
            <div className="text-xs font-bold text-zinc-700">{item.day.slice(0, 3)}</div>
            <div className="text-lg font-bold text-zinc-900 mt-1">
              {item.completed}/{item.total}
            </div>
            <p className="text-[11px] text-zinc-500 mb-2">{item.percentage}% done</p>
            <ProgressBar progress={item.percentage} heightClass="h-1.5" />
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Day Breakdown</h4>
        {dailyStats.map((item) => (
          <div key={item.day} className="flex items-center gap-4 text-xs">
            <span className="w-24 font-medium text-zinc-700">{item.day}</span>
            <div className="flex-1">
              <ProgressBar progress={item.percentage} heightClass="h-2" />
            </div>
            <span className="w-24 text-right font-medium text-zinc-600">
              {item.completed}/{item.total} ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}