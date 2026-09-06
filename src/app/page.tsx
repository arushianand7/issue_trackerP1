'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import ProgressBar from '@/components/ProgressBar';
import GoalCard from '@/components/GoalCard';
import Link from 'next/link';
import { CheckCircle2, Clock, ListChecks, ArrowUpRight } from 'lucide-react';

export default function TaskStatusPage() {
  const { stats, activeGoal, tasks } = useApp();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Task Status Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">
          High-level operational overview connected to current goals and daily tasks.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Tasks</span>
            <ListChecks className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 mt-2">{stats.totalTasks}</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 mt-2">{stats.completedTasks}</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">Pending</span>
            <Clock className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 mt-2">{stats.pendingTasks}</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Completion Rate</span>
            <span className="text-xs font-bold text-zinc-900">{stats.completionPercentage}%</span>
          </div>
          <div className="mt-4">
            <ProgressBar progress={stats.completionPercentage} heightClass="h-2" />
          </div>
        </div>
      </div>

      {/* Current Active Goal Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-zinc-900">Current Milestone Objective</h2>
          <Link
            href="/calendar-goals"
            className="text-xs font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-1"
          >
            Manage Goals <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {activeGoal ? (
          <GoalCard goal={activeGoal} />
        ) : (
          <div className="bg-white border border-dashed border-zinc-300 rounded-xl p-8 text-center">
            <p className="text-sm text-zinc-500">No active goal configured yet.</p>
            <Link
              href="/calendar-goals"
              className="inline-block mt-3 text-xs bg-zinc-900 text-white px-3.5 py-2 rounded-lg font-medium hover:bg-zinc-800 transition"
            >
              Create Goal
            </Link>
          </div>
        )}
      </div>

      {/* Recent Tasks List */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <h3 className="font-bold text-zinc-900 text-base">Current Tasks Snapshot</h3>
          <Link
            href="/daily-tasks"
            className="text-xs font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-1"
          >
            Go to Daily Tasks <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-zinc-100">
          {tasks.slice(0, 5).map((task) => (
            <div key={task._id || task.id} className="py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full ${
                    task.completed ? 'bg-emerald-500' : 'bg-amber-400'
                  }`}
                />
                <span className={task.completed ? 'line-through text-zinc-400' : 'text-zinc-800'}>
                  {task.title}
                </span>
              </div>
              <span className="text-xs text-zinc-400">{task.day}</span>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-xs text-zinc-400 py-4 text-center">No tasks available to preview.</p>
          )}
        </div>
      </div>
    </div>
  );
}