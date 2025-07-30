// src/app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// Corrected: avoid direct destructuring of `params` in function arguments
type Context = {
  params: {
    id: string;
  };
};

export async function PUT(req: Request, context: Context) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await req.json();

  const project = await prisma.project.update({
    where: { id },
    data: { name },
  });

  return NextResponse.json(project);
}

export async function DELETE(_: Request, context: Context) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.project.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
