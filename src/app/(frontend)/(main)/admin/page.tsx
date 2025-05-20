'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button} from '@/components/(shadcn)/ui/button';

interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  subscription: string;
  paymentStatus: string;
}

const AdminUserDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/users'); // Replace with actual route
      setUsers(res.data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = async (userId: string) => {
    await axios.patch(`/api/admin/users/${userId}/block`);
    fetchUsers();
  };

  const updatePayment = async (userId: string) => {
    await axios.patch(`/api/admin/users/${userId}/update-payment`);
    fetchUsers();
  };

  const removePayment = async (userId: string) => {
    await axios.delete(`/api/admin/users/${userId}/payment`);
    fetchUsers();
  };

  const changeSubscription = async (userId: string) => {
    const newSubscription = prompt('Enter new subscription plan (e.g., Free, Pro, Enterprise):');
    if (!newSubscription) return;
    await axios.patch(`/api/admin/users/${userId}/subscription`, {
      subscription: newSubscription,
    });
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard - All Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Blocked</th>
                <th className="p-2">Subscription</th>
                <th className="p-2">Payment</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.isBlocked ? 'Yes' : 'No'}</td>
                  <td className="p-2">{user.subscription}</td>
                  <td className="p-2">{user.paymentStatus}</td>
                  <td className="p-2 space-x-2">
                    <Button onClick={() => toggleBlock(user._id)} variant="outline">
                      {user.isBlocked ? 'Unblock' : 'Block'}
                    </Button>
                    <Button onClick={() => updatePayment(user._id)} variant="outline">
                      Update Payment
                    </Button>
                    <Button onClick={() => removePayment(user._id)} variant="destructive">
                      Remove Payment
                    </Button>
                    <Button onClick={() => changeSubscription(user._id)} variant="secondary">
                      Change Plan
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserDashboard;
