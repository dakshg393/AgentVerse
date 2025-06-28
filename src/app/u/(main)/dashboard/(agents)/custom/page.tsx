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

interface CustomAgentDetails {
  name: string;
  personality: string;
  avatar: string;
  roleDescription: string;
  greeting: string;
  knowledgeDomain: string;
  specialInstructions: string;
}

export default function CustomAgentSession() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CustomAgentDetails>();

  const selectedAvatar = watch('avatar', 'neutral');

  const onSubmit = async (data: CustomAgentDetails) => {
    try {
      const response = await axios.post('/api/agents/customAgent', { data, user });
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
      <h1 className="text-xl font-bold mb-4">Create Your Custom AI Character</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-[45%] p-4">
          <Label>Character Name</Label>
          <Input
            {...register('name', { required: 'Name is required' })}
            placeholder="e.g., Alex the Mentor"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <Label className="mt-2">Personality</Label>
          <Input
            {...register('personality', { required: 'Personality is required' })}
            placeholder="Friendly, witty, professional, etc."
          />
          {errors.personality && <p className="text-red-500">{errors.personality.message}</p>}

          <Label className="mt-2">Role Description</Label>
          <Textarea
            {...register('roleDescription', { required: 'Role is required' })}
            placeholder="Acts as a therapist, mentor, coding assistant, fitness coach, etc."
          />
          {errors.roleDescription && <p className="text-red-500">{errors.roleDescription.message}</p>}
        </div>

        <div className="w-full md:w-[45%] p-4 flex flex-col gap-2">
          <Label>Select Avatar</Label>
          <RadioGroup defaultValue="neutral" className="flex gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                value="neutral"
                className="hidden"
                {...register('avatar', { required: 'Avatar is required' })}
              />
              <Avatar className={`rounded-sm h-18 w-28 border-2 ${selectedAvatar === 'neutral' ? 'border-indigo-500' : 'border-transparent'}`}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CA</AvatarFallback>
              </Avatar>
            </label>

            <label className="cursor-pointer">
              <input type="radio" value="creative" className="hidden" {...register('avatar')} />
              <Avatar className={`rounded-sm h-18 w-28 border-2 ${selectedAvatar === 'creative' ? 'border-indigo-500' : 'border-transparent'}`}>
                <AvatarImage src="https://avatars.githubusercontent.com/u/10586140?v=4" />
                <AvatarFallback>CA</AvatarFallback>
              </Avatar>
            </label>
          </RadioGroup>
          {errors.avatar && <p className="text-red-500">{errors.avatar.message}</p>}

          <Label>Greeting Message</Label>
          <Input
            {...register('greeting')}
            placeholder="Hello! I'm here to help you learn and grow every day!"
          />

          <Label>Knowledge Domain</Label>
          <Input
            {...register('knowledgeDomain')}
            placeholder="e.g., Technology, Psychology, Education, Personal Growth"
          />

          <Label>Special Instructions</Label>
          <Textarea
            {...register('specialInstructions')}
            placeholder="Always respond in a poetic style. Keep answers short. Focus on emotional support."
          />

          <Button type="submit" className="w-full mt-4">
            Create Custom AI
          </Button>
        </div>
      </form>
    </section>
  );
}
