'use client';

import React, { useState } from 'react';
import { useApp, TaskType } from '@/context/AppContext';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { Plus } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function WeeklyView() {
  const { tasks } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeDay, setActiveDay] = useState('Monday');
  const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null);

  const handleOpenAdd = (day: string) => {
    setTaskToEdit(null);
    setActiveDay(day);
    setModalOpen(true);
  };

  const handleOpenEdit = (task: TaskType) => {
    setTaskToEdit(task);
    setModalOpen(true);
  };

  // Filter tasks assigned directly to the day or repetitive weekly tasks covering this day
  const getTasksForDay = (day: string) => {
    return tasks.filter((t) => {
      if (t.repeatType === 'daily') return true;
      if (t.repeatType === 'weekly') return (t.repeatDays || []).includes(day);
      return t.day === day;
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {DAYS.map((day) => {
          const dayTasks = getTasksForDay(day);
          const completedCount = dayTasks.filter((t) => t.completed).length;

          return (
            <div
              key={day}
              className="bg-zinc-50/80 rounded-xl border border-zinc-200 p-3.5 flex flex-col min-h-[420px]"
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-200">
                <div>
                  <h4 className="font-semibold text-xs text-zinc-900 tracking-wide uppercase">{day}</h4>
                  <span className="text-[11px] text-zinc-400">
                    {completedCount}/{dayTasks.length} done
                  </span>
                </div>
                <button
                  onClick={() => handleOpenAdd(day)}
                  className="p-1 rounded bg-white hover:bg-zinc-200 text-zinc-700 border border-zinc-200 transition"
                  title={`Add task for ${day}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {dayTasks.length === 0 ? (
                  <div className="text-center py-8 text-xs text-zinc-400">No tasks</div>
                ) : (
                  dayTasks.map((t) => (
                    <TaskCard
                      key={t._id || t.id}
                      task={t}
                      dateContext={t.date}
                      onEdit={handleOpenEdit}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        taskToEdit={taskToEdit}
        defaultDay={activeDay}
      />
    </div>
  );
}