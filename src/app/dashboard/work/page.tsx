import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export default async function WorkDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Work Management</h1>
      <p className="text-gray-600 mt-2">Welcome, {session.user.email}</p>
    </div>
  );
}
