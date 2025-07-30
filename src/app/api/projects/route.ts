import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Step 1: Get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { products: true },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Step 2: Get all projects from user's products
    const projects = await prisma.project.findMany({
      where: {
        productId: {
          in: user.products.map((product) => product.id),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('GET /api/projects error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, productId } = body;

    // Optional: Verify product belongs to user
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        user: {
          email: session.user.email,
        },
      },
    });

    if (!product) {
      return new NextResponse('Invalid product or unauthorized', { status: 403 });
    }

    // Create the project
    const newProject = await prisma.project.create({
      data: {
        name,
        productId: product.id,
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error('POST /api/projects error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
