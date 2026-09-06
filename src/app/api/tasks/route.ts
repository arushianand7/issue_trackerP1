import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';

export async function GET() {
  await dbConnect();
  const tasks = await Task.find({}).sort({ createdAt: -1 });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const task = await Task.create(body);
  return NextResponse.json(task, { status: 201 });
}