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

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = { fullName: name, email, password };
      const response = await axios.post('/api/c/auth/signup', user);
      console.log(JSON.stringify(response));
      toast.success(`${response.data.message || 'User  Signup '}`);
      router.push('/u/login');

      console.log('Signing up with', { name, email, password });
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Something went wrong');
      } else {
        // Handle network errors or other unexpected errors
        toast.error('Network error or server is down.');
        console.log('Network error:');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg ">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Create an Account</CardTitle>
          <p className="text-center text-sm">Sign up to start using the platform</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Link href="/u/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
