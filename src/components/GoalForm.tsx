'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Target, AlertCircle } from 'lucide-react';

export default function GoalForm() {
  const { saveGoal } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [startNote, setStartNote] = useState('');
  const [endNote, setEndNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!endDate) {
      setError('Please provide an end date.');
      return;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    if (endDateTime <= startDateTime) {
      setError('End date/time must be later than the start date/time.');
      return;
    }

    await saveGoal({
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      startNote,
      endNote,
    });

    setTitle('');
    setDescription('');
    setStartNote('');
    setEndNote('');
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-zinc-900" />
        <h3 className="font-bold text-zinc-900 text-lg">Define Target Goal</h3>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Goal Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='e.g. Complete Full Stack Development Course'
            className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Goal Description / Note</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Key outcomes, roadmaps or expectations..."
            className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Start Date *</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">Start Date Milestone Note</label>
          <input
            type="text"
            value={startNote}
            onChange={(e) => setStartNote(e.target.value)}
            placeholder='e.g. "Start learning React and Next.js"'
            className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">End Date *</label>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">End Date Milestone Note</label>
          <input
            type="text"
            value={endNote}
            onChange={(e) => setEndNote(e.target.value)}
            placeholder='e.g. "Complete entire course and final project"'
            className="w-full text-sm px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-zinc-900 text-white font-medium py-2.5 rounded-lg hover:bg-zinc-800 transition text-sm shadow"
        >
          Create / Save Goal
        </button>
      </form>
    </div>
  );
}