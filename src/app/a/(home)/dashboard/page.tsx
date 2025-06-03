'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/(shadcn)/ui/table';
import toast from 'react-hot-toast';

const AdminUserDashboard: React.FC = () => {
  const [users, setUsers] = useState([]); // ✅ should be array

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('/api/a/users');
        setUsers(response.data.data);
        toast.success('Users Data Fetched Successfully');
      } catch (error) {
        console.log(error);
        toast.error('Unable To Fetch Users Data');
      }
    };

    getUsers();
  }, []); // ✅ Add dependency array

  return (
    <section className="">
      <div className="flex items-start justify-center w-full gap-4">
        <div className="rounded-2xl border-2 overflow-x-auto w-[80%] ">
          <Table className="overflow-scroll max-[80%]">
            <TableHeader className="border-b-2">
              <TableRow className="bg-pink-500 hover:bg-pink-500">
                <TableHead className="p-8">UserId</TableHead>
                <TableHead className="p-8">Name</TableHead>
                <TableHead className="p-8">Email</TableHead>
                <TableHead className="p-8">Subscription Plan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="p-6">{user._id}</TableCell>
                  <TableCell className="p-6">{user.fullName}</TableCell>
                  <TableCell className="p-6">{user.email}</TableCell>
                  <TableCell className="p-6">{user.subscription}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default AdminUserDashboard;
