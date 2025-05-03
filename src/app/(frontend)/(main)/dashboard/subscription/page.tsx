import { Button } from '@/components/(shadcn)/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/(shadcn)/ui/card';
import { Plans } from '@/utils/subscription.utils';
import { features } from 'process';
export default function SubscriptionPage() {
  return (
    <section className="flex items-center justify-center flex-col  p-4 min-h-screen pb-16">
      <h1>Choose Your Plan That Best For You</h1>
      <div className="flex justify-center items-center flex-col md:flex-row gap-4">
        {Plans.map((plan) => {
          return (
            <Card>
              <CardHeader className="flex justify-center items-center flex-col">
                <CardTitle>{plan.planName} </CardTitle>
                <CardDescription className="text-center">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <h1 className="text-center">1{plan.price}</h1>
                </div>
                <div>
                  {plan.features.map((feature) => (
                    <li>{feature}</li>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Subscribe Now</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
