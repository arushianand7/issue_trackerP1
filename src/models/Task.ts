import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  date: string; // ISO string: YYYY-MM-DD
  day: string;  // 'Monday' | 'Tuesday' etc.
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  startTime?: string;
  dueTime?: string;
  repeatType: 'none' | 'daily' | 'weekly' | 'monthly';
  repeatDays: string[]; // e.g. ['Monday', 'Wednesday']
  completedDates: string[]; // Specific dates YYYY-MM-DD where marked done
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    date: { type: String, required: true },
    day: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    startTime: { type: String, default: '' },
    dueTime: { type: String, default: '' },
    repeatType: { type: String, enum: ['none', 'daily', 'weekly', 'monthly'], default: 'none' },
    repeatDays: { type: [String], default: [] },
    completedDates: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);