"use client";

import { Button } from '@/components/(shadcn)/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/(shadcn)/ui/card';
import useUserStore from '@/store/userStore';
import { Plans } from '@/utils/subscription.utils';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SubscriptionPage() {
  const user = useUserStore((state) => state.user);
  const userId = user?._id;
  const type = "free";

  const handleSubscribe = async () => {
    try {
      const res = await axios.post("/api/c/user/subscription", { userId, type });

      if (res.status === 200) {
        toast.success("Subscribed successfully!");
        // Optional: Update local user store state or reload
        window.location.reload();
      }
    } catch (error) {
      toast.error("User can't subscribe");
    }
  };

  return (
    <section className="flex items-center justify-center flex-col p-4 min-h-screen pb-16">
      <h1 className="text-4xl p-8 font-bold">Choose Your Plan That Best Suits You</h1>
      <div className="flex justify-center items-center flex-col md:flex-row gap-4">
        {Plans.map((plan, index) => (
          <Card key={index} className="w-[300px]">
            <CardHeader className="flex justify-center items-center flex-col">
              <CardTitle>{plan.planName}</CardTitle>
              <CardDescription className="text-center">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <h1 className="text-center font-semibold text-lg mb-2">₹{plan.price}</h1>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={handleSubscribe} 
                disabled={!!user?.subscription}
              >
                {user?.subscription ? "Already Subscribed" : "Subscribe Now"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
