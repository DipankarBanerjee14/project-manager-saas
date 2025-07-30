// src/app/api/projects/[id]/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;
  const { name } = await req.json();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const project = await prisma.project.update({
    where: { id },
    data: { name },
  });

  return NextResponse.json(project);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
