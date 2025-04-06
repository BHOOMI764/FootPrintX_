'use client';

import { useRouter } from 'next/navigation';
import { removeToken } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken(); // 🗑️ Remove token
    toast.success('Successfully logged out 💚'); // 🍭 Sweet success
    router.push('/auth/login'); // 🔁 Redirect to login
  };

  return (
    <Button onClick={handleLogout} variant="destructive">
      Logout
    </Button>
  );
}
