import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

// Type for dynamic segment context
interface RouteContext {
  params: {
    id: string;
  };
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;
  const body = await req.json();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const project = await prisma.project.update({
    where: { id },
    data: { name: body.name },
  });

  return NextResponse.json(project);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.project.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
