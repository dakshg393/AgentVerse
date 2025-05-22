'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button} from '@/components/(shadcn)/ui/button';
import {Card, CardContent, CardHeader} from '@/components/(shadcn)/ui/card';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   isBlocked: boolean;
//   subscription: string;
//   paymentStatus: string;
// }

const AdminUserDashboard: React.FC = () => {


  return (
    <section className=''>
      <div className='flex items-start justify-center w-full gap-4'>
        <Card className='max-w-80 min-w-40'>
        <CardHeader>
          Total Users
        </CardHeader>
        <CardContent>
          42
        </CardContent>
      </Card>
      <Card className='max-w-80 min-w-40'>
        <CardHeader>
          Total Subscribed User
        </CardHeader>
        <CardContent>
          42
        </CardContent>
      </Card>
      </div>
      
  
    </section>
  );
};

export default AdminUserDashboard;
