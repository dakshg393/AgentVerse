'use client';
import toast from 'react-hot-toast';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/(shadcn)/ui/button';
import { Input } from '@/components/(shadcn)/ui/input';
import { Label } from '@/components/(shadcn)/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/(shadcn)/ui/card';
import useUserStore from '@/store/userStore';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state)=>state.setUser)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('/api/c/auth/login', { email, password });
      console.log("Here is login response",response.data.data)
      setUser(response?.data.data)
      toast.success(response.data.message || 'Login successful');
      router.push('/u/dashboard');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Something went wrong');
      } else {
        toast.error('Network error. Please try again.');
        console.error('Login error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg ">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Login</CardTitle>
          <p className="text-center text-sm">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Link href="/u/forgetpassword" className="text-blue-600 hover:underline right-0 w-full">Forget Password ?</Link>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/u/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
