'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

type Feature = {
  id: string;
  title: string;
  createdAt: string;
};

export default function DevPage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await fetch('/api/dev');
        const data = await res.json();
        setFeatures(data);
      } catch {
        toast.error('Failed to load features');
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;

    const res = await fetch('/api/dev', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: { 'Content-Type': 'application/json' },
    });

    const newFeature = await res.json();
    setFeatures((prev) => [...prev, newFeature]);
    setTitle('');
    toast.success('Feature added');
  };

  const handleDelete = async (id: string) => {
    const ok = confirm('Delete this feature?');
    if (!ok) return;

    await fetch(`/api/dev/${id}`, { method: 'DELETE' });
    setFeatures((prev) => prev.filter((f) => f.id !== id));
    toast.success('Feature deleted');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dev - Features</h1>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Feature title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        features.map((f) => (
          <div
            key={f.id}
            className="flex justify-between items-center bg-gray-50 text-black p-4 rounded-lg shadow mb-3"
          >
            <div>
              <h2 className="text-lg font-semibold">{f.title}</h2>
              <p className="text-sm text-gray-500">
                Added: {new Date(f.createdAt).toLocaleString()}
              </p>
            </div>
            <Button variant="destructive" onClick={() => handleDelete(f.id)}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
