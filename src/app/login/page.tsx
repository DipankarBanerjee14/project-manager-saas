// src/app/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <button
  onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
  className="bg-black text-white px-4 py-2 rounded"
>
  Sign in with GitHub
</button>
    </div>
  );
}
