'use client';

import React, { useState } from 'react';
import WeeklyView from '@/components/WeeklyView';
import TaskModal from '@/components/TaskModal';
import { Plus } from 'lucide-react';

export default function DailyTasksPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Daily Tasks</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Plan, execute, and monitor activities across the week with automated recurring schedules.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition shadow"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      <WeeklyView />

      <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}