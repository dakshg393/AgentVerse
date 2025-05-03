'use client';

import { Button } from '@/components/(shadcn)/ui/button';
import { Input } from '@/components/(shadcn)/ui/input';
import { Label } from '@/components/(shadcn)/ui/label';
import { Progress } from '@/components/(shadcn)/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/(shadcn)/ui/table';
import useUserStore from '@/store/userStore';
import { transactions } from '@/utils/profile.utils';

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  // console.log(user);

  return (
    <section className="flex items-center  flex-col min-h-screen mb-16 mt-10">
      <span className="flex flex-col items-start justify-start w-[80%]">
        <h1 className="">Hi {user?.fullName}</h1>
        <h1 className="">{user?.email}</h1>
      </span>
      <div
        id="profile"
        className="flex flex-col justify-center items-center w-[80%] mt-10 p-4 border-2 rounded-2xl"
      >
        <div
          id="profileheader"
          className="flex flex-row justify-between w-full border-b-2 rounded-2xl p-2"
        >
          <h1>Profile</h1>
          <Button>Edit profile</Button>
        </div>
        <div className="flex flex-col justify-center  w-[90%] ">
          <h1>Profile Details</h1>
          <h2>Manage Your Profile Here</h2>
          <Label>Name</Label>
          <Input value={user?.fullName} type="text" className="w-full md:w-[50%]" />
          <Label>Email</Label>
          <Input value={user?.email} type="text" className="w-full md:w-[50%]" disabled />
        </div>
      </div>

      <div
        id="subscription"
        className="flex flex-col justify-center items-center w-[80%]  mt-26 p-4 border-2 rounded-2xl"
      >
        <div
          id="subscriptionheader"
          className="flex flex-row justify-between items-center p-2 w-full border-b-2 rounded-4xl "
        >
          <h1>Subscription</h1>
          <Button>Manage Subscription</Button>
        </div>
        <div className="flex flex-col justify-center  w-[90%] mt-10 ">
          <div
            id="subscriptionheader"
            className="flex flex-col justify-center w-full p-4 border-2 rounded-2xl"
          >
            <h1>Current Subscription</h1>
            <span className="flex items-center justify-between">
              <span>
                <h1>Premiumm Plan </h1>
                <h2>End of Plan {'12/12/25'}</h2>
              </span>
              <Button>Upgrade Plan</Button>
            </span>
          </div>
          <div
            id=""
            className="flex flex-col justify-between w-full p-4 border-2 rounded-2xl mt-10"
          >
            <h1 className=" ">Usage</h1>
            <span className="p-2">
              <h1>Usage Limit </h1>
              <h2>Your Usage Limit is full </h2>
              <Progress value={33} className="w-[80%] m-2 " />
            </span>
          </div>

          <div
            id="Billing"
            className="flex flex-col justify-between w-full p-4 border-2 rounded-2xl mt-10"
          >
            <h1>Billing</h1>
            <span className="p-2">
              <h1>Billing Histroy </h1>
              <h2>See Your Payment Histriy Here </h2>
            </span>
            <Table className="border-2  rounded-2xl">
              <TableHeader className="border-b-2">
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Plan Type</TableHead>
                  <TableHead>Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow>
                    {Object.keys(transaction).map((key) => (
                      <TableCell>${transaction[key]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
