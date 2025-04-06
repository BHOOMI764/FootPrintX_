'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/auth';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      setToken(res.data.token);
      router.push('/dashboard/admin');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <input className="w-full p-2 mb-3 border" placeholder="Email" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full p-2 mb-3 border" type="password" placeholder="Password"
        value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Login</button>
    </form>
  );
}
