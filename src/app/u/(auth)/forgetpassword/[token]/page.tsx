// 'use client';
// import toast from 'react-hot-toast';
// import Link from 'next/link';
// import React, { useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import axios from 'axios';
// import { Button } from '@/components/(shadcn)/ui/button';
// import { Input } from '@/components/(shadcn)/ui/input';
// import { Label } from '@/components/(shadcn)/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/(shadcn)/ui/card';
// import useUserStore from '@/store/userStore';

// export default function ForgetPasswordPage() {
//   const router = useRouter();
//   const params = useParams()
//   const token = decodeURIComponent(params.token)
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//  const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       const response = await axios.post('/api/c/auth/forgetpassword', {token,password});
//       console.log("Here is response",response.data.data)
   
//       toast.success(response.data.message || 'Password Reset Successfully');
//       router.push('/u/login');
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         toast.error(error.response?.data?.message || 'Something went wrong');
//       } else {
//         toast.error('Network error. Please try again.');
       
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4">
//       <Card className="w-full max-w-md p-6 shadow-lg rounded-lg ">
//         <CardHeader>
//           <CardTitle className="text-center text-2xl font-semibold">Reset Password</CardTitle>
//           <p className="text-center text-sm">Enter your new password below to reset your account access.</p>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <Label htmlFor="Password">New Password</Label>
//               <Input
//                 id="newpassword"
//                 type="password"
//                 placeholder="Enter your New Password"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//             <Label htmlFor="confirmpassword">Confirm Password</Label>
//               <Input
//                 id="confirmpassword"
//                 type="password"
//                 placeholder="Enter your Confirm Password"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
            
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? 'Logging in...' : ' Reset Password  '}
//             </Button>
//           </form>
         
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


'use client';
import toast from 'react-hot-toast';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/(shadcn)/ui/button';
import { Input } from '@/components/(shadcn)/ui/input';
import { Label } from '@/components/(shadcn)/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/(shadcn)/ui/card';

// 1. Zod Schema inside the component file
const formSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

export default function ForgetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token ;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post('/api/c/auth/forgetpassword', {
        token,
        password: data.password,
      });

      toast.success(response.data.message || 'Password reset successfully');
      router.push('/u/login');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Something went wrong');
      } else {
        toast.error('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Reset Password</CardTitle>
          <p className="text-center text-sm">Enter your new password below to reset access.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="Enter your new password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                placeholder="Confirm your new password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
