'use client';

import React, { useState, useEffect } from 'react';
import { TaskType, useApp } from '@/context/AppContext';
import { X } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: TaskType | null;
  defaultDay?: string;
  defaultDate?: string;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function TaskModal({
  isOpen,
  onClose,
  taskToEdit,
  defaultDay = 'Monday',
  defaultDate = new Date().toISOString().split('T')[0],
}: TaskModalProps) {
  const { addTask, updateTask } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [day, setDay] = useState(defaultDay);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [startTime, setStartTime] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [repeatType, setRepeatType] = useState<'none' | 'daily' | 'weekly' | 'monthly'>('none');
  const [repeatDays, setRepeatDays] = useState<string[]>([]);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setDate(taskToEdit.date);
      setDay(taskToEdit.day);
      setPriority(taskToEdit.priority);
      setStartTime(taskToEdit.startTime || '');
      setDueTime(taskToEdit.dueTime || '');
      setRepeatType(taskToEdit.repeatType);
      setRepeatDays(taskToEdit.repeatDays || []);
    } else {
      setTitle('');
      setDescription('');
      setDate(defaultDate);
      setDay(defaultDay);
      setPriority('medium');
      setStartTime('');
      setDueTime('');
      setRepeatType('none');
      setRepeatDays([defaultDay]);
    }
  }, [taskToEdit, isOpen, defaultDay, defaultDate]);

  if (!isOpen) return null;

  const toggleDaySelection = (selectedDay: string) => {
    setRepeatDays((prev) =>
      prev.includes(selectedDay) ? prev.filter((d) => d !== selectedDay) : [...prev, selectedDay]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (taskToEdit) {
      const id = (taskToEdit._id || taskToEdit.id) as string;
      await updateTask(id, {
        title,
        description,
        date,
        day,
        priority,
        startTime,
        dueTime,
        repeatType,
        repeatDays: repeatType === 'weekly' ? repeatDays : [],
      });
    } else {
      await addTask({
        title,
        description,
        date,
        day,
        completed: false,
        priority,
        startTime,
        dueTime,
        repeatType,
        repeatDays: repeatType === 'weekly' ? repeatDays : [],
        completedDates: [],
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative border border-zinc-100 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 rounded p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-semibold text-zinc-900 mb-4">
          {taskToEdit ? 'Edit Task' : 'Add New Task'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Task Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Study Next.js Server Components"
              className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes or context..."
              className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Day</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                {DAYS_OF_WEEK.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Due Time</label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Repeat Cadence</label>
            <select
              value={repeatType}
              onChange={(e) => setRepeatType(e.target.value as any)}
              className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
            >
              <option value="none">Does not repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {repeatType === 'weekly' && (
            <div>
              <span className="block text-xs font-semibold text-zinc-700 uppercase mb-2">Repeat On Days</span>
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((d) => {
                  const isSelected = repeatDays.includes(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDaySelection(d)}
                      className={`text-xs px-2.5 py-1 rounded-md border font-medium transition ${
                        isSelected
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                      }`}
                    >
                      {d.slice(0, 3)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-3 border-t border-zinc-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition"
            >
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}