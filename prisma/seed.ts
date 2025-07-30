import { PrismaClient, ProductType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst(); // Seed under first user

  if (!user) {
    throw new Error("No user found. Please register a user before seeding.");
  }

  await prisma.product.createMany({
    data: [
      { name: 'monday work management', type: ProductType.WORK_MANAGEMENT, userId: user.id },
      { name: 'monday CRM', type: ProductType.CRM, userId: user.id },
      { name: 'monday dev', type: ProductType.DEV, userId: user.id },
      { name: 'monday service', type: ProductType.SERVICE, userId: user.id },
    ],
  });

  console.log('✅ Seeded all products');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
