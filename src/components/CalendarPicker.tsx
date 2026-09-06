'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPicker() {
  const { activeGoal } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // Default: Sept 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calendar Day generation
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first offset

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayIndex }, (_, i) => i);

  const isBetweenGoal = (d: number) => {
    if (!activeGoal) return false;
    const currentFormatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return currentFormatted > activeGoal.startDate && currentFormatted < activeGoal.endDate;
  };

  const isStartDate = (d: number) => {
    if (!activeGoal) return false;
    const currentFormatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return currentFormatted === activeGoal.startDate;
  };

  const isEndDate = (d: number) => {
    if (!activeGoal) return false;
    const currentFormatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return currentFormatted === activeGoal.endDate;
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-zinc-900 text-base">
          {monthNames[month]} {year}
        </h3>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50">
            <ChevronLeft className="w-4 h-4 text-zinc-600" />
          </button>
          <button onClick={nextMonth} className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50">
            <ChevronRight className="w-4 h-4 text-zinc-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-zinc-400 mb-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {blanks.map((b) => (
          <div key={`blank-${b}`} className="h-10" />
        ))}
        {days.map((d) => {
          const isStart = isStartDate(d);
          const isEnd = isEndDate(d);
          const isMid = isBetweenGoal(d);

          let cellClass = 'hover:bg-zinc-100 text-zinc-700';
          if (isStart) cellClass = 'bg-zinc-900 text-white font-bold rounded-l-md';
          else if (isEnd) cellClass = 'bg-zinc-900 text-white font-bold rounded-r-md';
          else if (isMid) cellClass = 'bg-zinc-100 text-zinc-900 font-medium';

          return (
            <div
              key={d}
              className={`h-10 flex flex-col items-center justify-center text-xs transition-colors relative cursor-default ${cellClass}`}
            >
              <span>{d}</span>
              {(isStart || isEnd) && (
                <span className="w-1 h-1 bg-emerald-400 rounded-full mt-0.5" />
              )}
            </div>
          );
        })}
      </div>

      {activeGoal && (
        <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-zinc-900 rounded-sm" />
            <span>Start / End Point</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-zinc-100 border border-zinc-300 rounded-sm" />
            <span>Goal Active Span</span>
          </div>
        </div>
      )}
    </div>
  );
}