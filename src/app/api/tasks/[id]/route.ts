// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Task from '@/models/Task';

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   await dbConnect();
//   const body = await req.json();
//   const updatedTask = await Task.findByIdAndUpdate(params.id, body, { new: true });
//   return NextResponse.json(updatedTask);
// }

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   await dbConnect();
//   await Task.findByIdAndDelete(params.id);
//   return NextResponse.json({ success: true });
// }



import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';

// Fixed PUT function: treating params as a Promise and awaiting it
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  
  // Await the parameters before using the id
  const resolvedParams = await params;
  const body = await req.json();
  
  const updatedTask = await Task.findByIdAndUpdate(resolvedParams.id, body, { new: true });
  return NextResponse.json(updatedTask);
}

// Fixed DELETE function: treating params as a Promise and awaiting it
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  
  // Await the parameters before using the id
  const resolvedParams = await params;
  
  await Task.findByIdAndDelete(resolvedParams.id);
  return NextResponse.json({ success: true });
}
