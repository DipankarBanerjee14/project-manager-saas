// src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: {
      product: {
        userId: session.user.id,
        type: 'WORK_MANAGEMENT',
      },
    },
    orderBy: { createdAt: 'desc' },
    include: { product: true },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });

  const product = await prisma.product.findFirst({
    where: {
      userId: session.user.id,
      type: 'WORK_MANAGEMENT',
    },
  });

  if (!product) {
    return NextResponse.json({ error: 'No Work Management product found' }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      name,
      productId: product.id,
    },
  });

  return NextResponse.json(project);
}
