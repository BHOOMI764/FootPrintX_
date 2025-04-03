'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Leaf, LogOut, Moon, Sun, User } from 'lucide-react';
import { toast } from 'sonner';



export function Navbar() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="font-bold">FootprintX</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="hover:text-foreground/80">Dashboard</Link>
              <Link href="/calculate" className="hover:text-foreground/80">Calculate</Link>
              <Link href="/complaints" className="hover:text-foreground/80">Complaints</Link>
              <Link href="/leaderboard" className="hover:text-foreground/80">Leaderboard</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="/signin">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}