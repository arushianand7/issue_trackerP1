import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Goal from '@/models/Goal';

export async function GET() {
  await dbConnect();
  const goals = await Goal.find({}).sort({ createdAt: -1 });
  return NextResponse.json(goals);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  if (new Date(`${body.endDate}T${body.endTime || '23:59'}`) <= new Date(`${body.startDate}T${body.startTime || '00:00'}`)) {
    return NextResponse.json({ error: 'End date/time must be strictly after start date/time.' }, { status: 400 });
  }
  const goal = await Goal.create(body);
  return NextResponse.json(goal, { status: 201 });
}