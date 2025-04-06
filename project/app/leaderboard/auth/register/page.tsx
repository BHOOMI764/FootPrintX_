'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registered successfully');
      router.push('/auth/login');
    } catch (err) {
      alert('Register failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <input className="w-full p-2 mb-3 border" placeholder="Name"
        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="w-full p-2 mb-3 border" placeholder="Email"
        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full p-2 mb-3 border" type="password" placeholder="Password"
        value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Register</button>
    </form>
  );
}
