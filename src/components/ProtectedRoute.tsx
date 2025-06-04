'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import useUserStore from '@/store/userStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
  

    if (user && !user.isVerified && pathname !== '/u/verify') {
      toast.error('Please verify your email');
      router.push('/u/verify');
    }
  }, [user, pathname]);

  return <>{children}</>;
}
