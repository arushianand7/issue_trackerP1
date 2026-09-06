'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export interface TaskType {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  date: string;
  day: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  startTime?: string;
  dueTime?: string;
  repeatType: 'none' | 'daily' | 'weekly' | 'monthly';
  repeatDays: string[];
  completedDates?: string[];
}

export interface GoalType {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  startNote?: string;
  endNote?: string;
}

interface AppContextType {
  tasks: TaskType[];
  activeGoal: GoalType | null;
  loading: boolean;
  addTask: (task: Omit<TaskType, '_id' | 'id'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<TaskType>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompletion: (id: string, dateStr?: string) => Promise<void>;
  saveGoal: (goal: Omit<GoalType, '_id' | 'id'>) => Promise<void>;
  stats: {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    completionPercentage: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [activeGoal, setActiveGoal] = useState<GoalType | null>(null);
  const [loading, setLoading] = useState(true);

  // Initial Fetch with LocalStorage fallback
  useEffect(() => {
    async function loadData() {
      try {
        const [taskRes, goalRes] = await Promise.all([fetch('/api/tasks'), fetch('/api/goals')]);
        if (taskRes.ok && goalRes.ok) {
          const taskData = await taskRes.json();
          const goalData = await goalRes.json();
          setTasks(taskData);
          if (goalData.length > 0) setActiveGoal(goalData[0]);
        }
      } catch (err) {
        // Fallback to localStorage if running without an active MongoDB connection
        const localTasks = localStorage.getItem('local_tasks');
        const localGoal = localStorage.getItem('local_goal');
        if (localTasks) setTasks(JSON.parse(localTasks));
        if (localGoal) setActiveGoal(JSON.parse(localGoal));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const syncLocal = (newTasks: TaskType[], newGoal?: GoalType | null) => {
    localStorage.setItem('local_tasks', JSON.stringify(newTasks));
    if (newGoal !== undefined) {
      localStorage.setItem('local_goal', JSON.stringify(newGoal));
    }
  };

  const addTask = async (newTaskData: Omit<TaskType, '_id' | 'id'>) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTaskData),
      });
      if (res.ok) {
        const created = await res.json();
        setTasks((prev) => [created, ...prev]);
        return;
      }
    } catch (_) {}
    const dummyTask: TaskType = { ...newTaskData, _id: Date.now().toString() };
    setTasks((prev) => {
      const updated = [dummyTask, ...prev];
      syncLocal(updated);
      return updated;
    });
  };

  const updateTask = async (id: string, updates: Partial<TaskType>) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch (_) {}
    setTasks((prev) => {
      const updated = prev.map((t) => ((t._id || t.id) === id ? { ...t, ...updates } : t));
      syncLocal(updated);
      return updated;
    });
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    } catch (_) {}
    setTasks((prev) => {
      const updated = prev.filter((t) => (t._id || t.id) !== id);
      syncLocal(updated);
      return updated;
    });
  };

  const toggleTaskCompletion = async (id: string, dateStr?: string) => {
    const task = tasks.find((t) => (t._id || t.id) === id);
    if (!task) return;

    let updates: Partial<TaskType> = {};
    if (task.repeatType !== 'none' && dateStr) {
      const completedDates = task.completedDates || [];
      const exists = completedDates.includes(dateStr);
      updates.completedDates = exists
        ? completedDates.filter((d) => d !== dateStr)
        : [...completedDates, dateStr];
    } else {
      updates.completed = !task.completed;
    }

    await updateTask(id, updates);
  };

  const saveGoal = async (newGoalData: Omit<GoalType, '_id' | 'id'>) => {
    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoalData),
      });
      if (res.ok) {
        const created = await res.json();
        setActiveGoal(created);
        return;
      }
    } catch (_) {}
    const dummyGoal: GoalType = { ...newGoalData, _id: Date.now().toString() };
    setActiveGoal(dummyGoal);
    syncLocal(tasks, dummyGoal);
  };

  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    return { totalTasks, completedTasks, pendingTasks, completionPercentage };
  }, [tasks]);

  return (
    <AppContext.Provider
      value={{
        tasks,
        activeGoal,
        loading,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        saveGoal,
        stats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};