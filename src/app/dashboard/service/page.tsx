'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

type Ticket = {
  id: string;
  subject: string;
  createdAt: string;
};

export default function ServicePage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch('/api/service');
        const data = await res.json();
        setTickets(data);
      } catch {
        toast.error('Failed to load tickets');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleCreate = async () => {
    if (!subject.trim()) return;

    const res = await fetch('/api/service', {
      method: 'POST',
      body: JSON.stringify({ subject }),
      headers: { 'Content-Type': 'application/json' },
    });

    const newTicket = await res.json();
    setTickets((prev) => [...prev, newTicket]);
    setSubject('');
    toast.success('Ticket created');
  };

  const handleDelete = async (id: string) => {
    const ok = confirm('Are you sure you want to delete this ticket?');
    if (!ok) return;

    await fetch(`/api/service/${id}`, { method: 'DELETE' });
    setTickets((prev) => prev.filter((t) => t.id !== id));
    toast.success('Ticket deleted');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Service - Tickets</h1>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Ticket subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
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
        tickets.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center bg-gray-50 text-black p-4 rounded-lg shadow mb-3"
          >
            <div>
              <h2 className="text-lg font-semibold">{t.subject}</h2>
              <p className="text-sm text-gray-500">
                Created: {new Date(t.createdAt).toLocaleString()}
              </p>
            </div>
            <Button variant="destructive" onClick={() => handleDelete(t.id)}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
