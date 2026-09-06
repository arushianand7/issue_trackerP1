'use client';

import React from 'react';
import { TaskType, useApp } from '@/context/AppContext';
import { Check, Clock, Trash2, Edit2 } from 'lucide-react';

interface TaskCardProps {
  task: TaskType;
  dateContext?: string;
  onEdit: (task: TaskType) => void;
}

export default function TaskCard({ task, dateContext, onEdit }: TaskCardProps) {
  const { toggleTaskCompletion, deleteTask } = useApp();
  const id = (task._id || task.id) as string;

  // Determine completion in repetitive contexts
  const isDone = task.repeatType !== 'none' && dateContext
    ? (task.completedDates || []).includes(dateContext)
    : task.completed;

  const priorityColor = {
    low: 'bg-zinc-100 text-zinc-600 border-zinc-200',
    medium: 'bg-blue-50 text-blue-700 border-blue-200',
    high: 'bg-rose-50 text-rose-700 border-rose-200',
  }[task.priority];

  return (
    <div
      className={`group relative p-3.5 rounded-lg border transition-all ${
        isDone
          ? 'bg-zinc-50/70 border-zinc-200'
          : 'bg-white border-zinc-200 shadow-sm hover:border-zinc-300'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          type="button"
          onClick={() => toggleTaskCompletion(id, dateContext)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
            isDone
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'border-zinc-300 bg-white hover:border-zinc-400'
          }`}
        >
          {isDone && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium transition-all ${
                isDone ? 'line-through text-zinc-400' : 'text-zinc-900'
              }`}
            >
              {task.title}
            </span>
          </div>

          {task.description && (
            <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded border ${priorityColor}`}>
              {task.priority}
            </span>
            {(task.startTime || task.dueTime) && (
              <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                <Clock className="w-3 h-3" />
                {task.startTime || '--:--'} - {task.dueTime || '--:--'}
              </span>
            )}
            {task.repeatType !== 'none' && (
              <span className="text-[10px] text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">
                Repeats: {task.repeatType}
              </span>
            )}
          </div>
        </div>

        {/* Action icons */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-zinc-400 hover:text-zinc-600 rounded"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => deleteTask(id)}
            className="p-1 text-zinc-400 hover:text-rose-600 rounded"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}