'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/${mode}`,
        mode === 'login'
          ? { email, password }
          : { name, email, password }
      );

      if (mode === 'login') {
        setToken(response.data.token);
        router.push('/dashboard/admin');
      } else {
        router.push('/auth/login');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">
        {mode === 'login' ? 'Login to your account' : 'Create an account'}
      </h2>

      {mode === 'register' && (
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full">
        {mode === 'login' ? 'Login' : 'Register'}
      </Button>
    </form>
  );
}
