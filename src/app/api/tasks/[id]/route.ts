import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const body = await req.json();
  const updatedTask = await Task.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updatedTask);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  await Task.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}