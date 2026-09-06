import mongoose, { Schema, Document } from 'mongoose';

export interface IGoal extends Document {
  title: string;
  description?: string;
  startDate: string; // ISO string: YYYY-MM-DD
  endDate: string;   // ISO string: YYYY-MM-DD
  startTime?: string;
  endTime?: string;
  startNote?: string;
  endNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema = new Schema<IGoal>(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    startTime: { type: String, default: '00:00' },
    endTime: { type: String, default: '23:59' },
    startNote: { type: String, default: '' },
    endNote: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Goal || mongoose.model<IGoal>('Goal', GoalSchema);