'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import GoalCard from '@/components/GoalCard';
import GoalForm from '@/components/GoalForm';
import CalendarPicker from '@/components/CalendarPicker';

export default function CalendarGoalsPage() {
  const { activeGoal } = useApp();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Calendar & Goals</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Define long-term targets, schedule dates, attach milestone notes, and monitor your countdown.
        </p>
      </div>

      {activeGoal && <GoalCard goal={activeGoal} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GoalForm />
        <CalendarPicker />
      </div>
    </div>
  );
}