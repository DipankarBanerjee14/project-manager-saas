// src/app/products/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import  prisma  from "@/lib/prisma";
import Link from "next/link";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <p className="text-red-600 p-10">You must be logged in to view this page.</p>;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { products: true },
  });

  if (!user) {
    return <p className="text-red-600 p-10">User not found.</p>;
  }

  const getColor = (type: string) => {
    switch (type) {
      case "WORK_MANAGEMENT":
        return "bg-purple-500";
      case "CRM":
        return "bg-cyan-400";
      case "DEV":
        return "bg-green-500";
      case "SERVICE":
        return "bg-pink-500";
      default:
        return "bg-gray-400";
    }
  };

  const getHref = (type: string) => {
    switch (type) {
      case "WORK_MANAGEMENT":
        return "/dashboard/work";
      case "CRM":
        return "/dashboard/crm";
      case "DEV":
        return "/dashboard/dev";
      case "SERVICE":
        return "/dashboard/service";
      default:
        return "#";
    }
  };

  const getDescription = (type: string) => {
    switch (type) {
      case "WORK_MANAGEMENT":
        return "For projects & tasks";
      case "CRM":
        return "For customer-facing teams";
      case "DEV":
        return "For product & dev teams";
      case "SERVICE":
        return "For IT & support";
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-10">
      {user.products.map((product) => (
        <Link
          key={product.id}
          href={getHref(product.type)}
          className="flex items-center gap-4 p-6 rounded-lg shadow hover:shadow-lg transition bg-white"
        >
          <div className={`w-12 h-12 rounded ${getColor(product.type)}`} />
          <div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">{getDescription(product.type)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
