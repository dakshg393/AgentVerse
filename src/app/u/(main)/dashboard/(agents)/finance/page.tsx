'use client';

import { Button } from '@/components/(shadcn)/ui/button';
import { Input } from '@/components/(shadcn)/ui/input';
import { Label } from '@/components/(shadcn)/ui/label';
import { RadioGroup } from '@/components/(shadcn)/ui/radio-group';
import { Textarea } from '@/components/(shadcn)/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/(shadcn)/ui/avatar';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useUserStore from '@/store/userStore';
import toast from 'react-hot-toast';

interface FinanceSessionDetails {
  financialGoals: string;
  incomeDetails: string;
  expenseDetails: string;
  avatar: string;
  age: number;
  investmentExperience: string;
  taxConcerns: string;
}

export default function FinanceAgentSession() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FinanceSessionDetails>();

  const selectedAvatar = watch('avatar', 'male');

  const onSubmit = async (data: FinanceSessionDetails) => {
    try {
      const response = await axios.post('/api/agents/financeAgent', { data, user });
      toast.success(response.data.message);
      router.push(`/u/dashboard/sessions/session/${response?.data?.data?._id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Submission failed.');
      } else {
        toast.error('An unexpected error has occurred.');
      }
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center flex-col p-4 pb-20">
      <h1 className="text-xl font-bold mb-4">Smart Financial Planning Starts Here</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-[45%] p-4">
          <Label>Financial Goals</Label>
          <Textarea
            {...register('financialGoals', { required: 'This field is required' })}
            placeholder="Retirement, Buying a home, Saving for children’s education, etc."
          />
          {errors.financialGoals && <p className="text-red-500">{errors.financialGoals.message}</p>}

          <Label className="mt-2">Income Details</Label>
          <Textarea
            {...register('incomeDetails', { required: 'Income details are required' })}
            placeholder="Current salary, passive income, business income, etc."
          />
          {errors.incomeDetails && <p className="text-red-500">{errors.incomeDetails.message}</p>}

          <Label className="mt-2">Expense Breakdown</Label>
          <Textarea
            {...register('expenseDetails')}
            placeholder="Monthly rent, groceries, utilities, subscriptions, etc."
          />
        </div>

        <div className="w-full md:w-[45%] p-4 flex flex-col gap-2">
          <Label>Choose Your Finance Advisor Avatar</Label>
          <RadioGroup defaultValue="male" className="flex gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                value="male"
                className="hidden"
                {...register('avatar', { required: 'Avatar is required' })}
              />
              <Avatar className={`rounded-sm h-18 w-28 border-2 ${selectedAvatar === 'male' ? 'border-blue-500' : 'border-transparent'}`}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>FA</AvatarFallback>
              </Avatar>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                value="female"
                className="hidden"
                {...register('avatar')}
              />
              <Avatar className={`rounded-sm h-18 w-28 border-2 ${selectedAvatar === 'female' ? 'border-blue-500' : 'border-transparent'}`}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>FA</AvatarFallback>
              </Avatar>
            </label>
          </RadioGroup>
          {errors.avatar && <p className="text-red-500">{errors.avatar.message}</p>}

          <Label>Age</Label>
          <Input
            {...register('age', { required: 'Age is required', valueAsNumber: true })}
            type="number"
            min={0}
            max={120}
            placeholder="Enter your age"
          />

          <Label>Investment Experience</Label>
          <Input
            {...register('investmentExperience')}
            placeholder="Beginner, Intermediate, Expert"
          />

          <Label>Tax Concerns or Questions</Label>
          <Textarea
            {...register('taxConcerns')}
            placeholder="Any questions about tax savings, returns, or compliance?"
          />

          <Button type="submit" className="w-full mt-4">
            Get Finance Advice Now
          </Button>
        </div>
      </form>
    </section>
  );
}
