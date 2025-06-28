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

interface LegalSessionDetails {
  legalTopic: string;
  contractText: string;
  avatar: string;
  contextBackground: string;
  urgencyLevel: string;
  jurisdiction: string;
  specificQuestions: string;
}

export default function LegalAgentSession() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LegalSessionDetails>();

  const selectedAvatar = watch('avatar', 'neutral');

  const onSubmit = async (data: LegalSessionDetails) => {
    try {
      const response = await axios.post('/api/agents/legalAgent', { data, user });
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
      <h1 className="text-xl font-bold mb-4">Get Legal Insights with AI</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-[45%] p-4">
          <Label>Legal Topic</Label>
          <Input
            {...register('legalTopic', { required: 'Legal topic is required' })}
            placeholder="Contract Review, NDA, Lease, Employment Law"
          />
          {errors.legalTopic && <p className="text-red-500">{errors.legalTopic.message}</p>}

          <Label className="mt-2">Contract Text or Legal Content</Label>
          <Textarea
            {...register('contractText', { required: 'Legal content is required' })}
            placeholder="Paste contract or terms for review..."
          />
          {errors.contractText && <p className="text-red-500">{errors.contractText.message}</p>}

          <Label className="mt-2">Context / Background</Label>
          <Textarea
            {...register('contextBackground')}
            placeholder="Explain the situation or what you’re trying to achieve."
          />
        </div>

        <div className="w-full md:w-[45%] p-4 flex flex-col gap-2">
          <Label>Select Legal Agent Avatar</Label>
          <RadioGroup defaultValue="neutral" className="flex gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                value="neutral"
                className="hidden"
                {...register('avatar', { required: 'Avatar is required' })}
              />
              <Avatar className={`rounded-sm h-18 w-28 border-2 ${selectedAvatar === 'neutral' ? 'border-red-500' : 'border-transparent'}`}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>LA</AvatarFallback>
              </Avatar>
            </label>

            <label className="cursor-pointer">
              <input type="radio" value="serious" className="hidden" {...register('avatar')} />
              <Avatar className={`rounded-sm h-18 w-28 border-2 ${selectedAvatar === 'serious' ? 'border-red-500' : 'border-transparent'}`}>
                <AvatarImage src="https://avatars.githubusercontent.com/u/13920357?v=4" />
                <AvatarFallback>LA</AvatarFallback>
              </Avatar>
            </label>
          </RadioGroup>
          {errors.avatar && <p className="text-red-500">{errors.avatar.message}</p>}

          <Label>Urgency Level</Label>
          <Input
            {...register('urgencyLevel')}
            placeholder="Low, Medium, High"
          />

          <Label>Jurisdiction / Country</Label>
          <Input
            {...register('jurisdiction')}
            placeholder="e.g., India, USA, EU"
          />

          <Label>Specific Questions</Label>
          <Textarea
            {...register('specificQuestions')}
            placeholder="What do you want the legal agent to explain or look for?"
          />

          <Button type="submit" className="w-full mt-4">
            Get Legal Advice
          </Button>
        </div>
      </form>
    </section>
  );
}
