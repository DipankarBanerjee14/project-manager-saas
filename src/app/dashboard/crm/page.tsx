'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

type Customer = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function CRMPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('/api/crm');
        const data = await res.json();
        setCustomers(data);
      } catch {
        toast.error('Failed to load customers');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleCreate = async () => {
    if (!name.trim() || !email.trim()) return;

    const res = await fetch('/api/crm', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
      headers: { 'Content-Type': 'application/json' },
    });

    const newCustomer = await res.json();
    setCustomers((prev) => [...prev, newCustomer]);
    setName('');
    setEmail('');
    toast.success('Customer added');
  };

  const handleDelete = async (id: string) => {
    const ok = confirm('Are you sure?');
    if (!ok) return;

    await fetch(`/api/crm/${id}`, { method: 'DELETE' });
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    toast.success('Customer deleted');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">CRM - Customers</h1>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 mb-6">
        <Input
          placeholder="Customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Customer email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleCreate}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </div>
      ) : (
        customers.map((c) => (
          <div
            key={c.id}
            className="flex justify-between items-center bg-gray-50 text-black p-4 rounded-lg shadow mb-3"
          >
            <div>
              <h2 className="text-lg font-semibold">{c.name}</h2>
              <p className="text-sm text-gray-500">{c.email}</p>
              <p className="text-sm text-gray-400">
                Joined: {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
            <Button variant="destructive" onClick={() => handleDelete(c.id)}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
