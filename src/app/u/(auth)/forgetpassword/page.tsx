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

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state)=>state.setUser)

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.get(`/api/c/auth/forgetpassword/${email}`);
      toast.success(response.data.message || 'Password Link Send to Your Mail');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Something went wrong');
      } else {
        toast.error('Network error. Please try again.');
        console.log('Reset Password error');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg ">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Forgot Password</CardTitle>
          <p className="text-center text-sm">Enter your email address and we’ll send you a link to reset your password.</p>
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
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Send Reset Link '}
            </Button>
          </form>
         
        </CardContent>
      </Card>
    </div>
  );
}
