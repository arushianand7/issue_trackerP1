'use client';

import React from 'react';
import WeeklyReport from '@/components/WeeklyReport';
import MonthlyReport from '@/components/MonthlyReport';

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Performance Analytics</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Holistic insights into weekly task velocity and monthly completion metrics.
        </p>
      </div>

      <WeeklyReport />
      <MonthlyReport />
    </div>
  );
}