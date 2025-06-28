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

interface EduBotSessionDetails {
  subject: string;
  currentLevel: string;
  learningGoals: string;
  avatar: string;
  preferredLearningStyle: string;
  timeAvailablePerDay: string;
  challenges: string;
}

export default function EduBotSession() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EduBotSessionDetails>();

  const selectedAvatar = watch('avatar', 'male');

  const onSubmit = async (data: EduBotSessionDetails) => {
    try {
      const response = await axios.post('/api/agents/eduAgent', { data, user });
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
      <h1 className="text-xl font-bold mb-4">Get Your Learning Plan with EduBot</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-[45%] p-4">
          <Label>Subject You Want to Learn</Label>
          <Input
            {...register('subject', { required: 'Subject is required' })}
            placeholder="e.g., JavaScript, Biology, Math"
          />
          {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}

          <Label className="mt-2">Current Knowledge Level</Label>
          <Input
            {...register('currentLevel')}
            placeholder="Beginner, Intermediate, Advanced"
          />

          <Label className="mt-2">Your Learning Goals</Label>
          <Textarea
            {...register('learningGoals', { required: 'Goals are required' })}
            placeholder="Pass an exam, build a project, improve skills for a job..."
          />
          {errors.learningGoals && <p className="text-red-500">{errors.learningGoals.message}</p>}
        </div>

        <div className="w-full md:w-[45%] p-4 flex flex-col gap-2">
          <Label>Choose Your EduBot Avatar</Label>
          <RadioGroup defaultValue="male" className="flex gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                value="male"
                className="hidden"
                {...register('avatar', { required: 'Avatar is required' })}
              />
              <Avatar className={`rounded-sm h-18 w-28 border-2 ${selectedAvatar === 'male' ? 'border-purple-500' : 'border-transparent'}`}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>EB</AvatarFallback>
              </Avatar>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                value="female"
                className="hidden"
                {...register('avatar')}
              />
              <Avatar className={`rounded-sm h-18 w-28 border-2 ${selectedAvatar === 'female' ? 'border-purple-500' : 'border-transparent'}`}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>EB</AvatarFallback>
              </Avatar>
            </label>
          </RadioGroup>
          {errors.avatar && <p className="text-red-500">{errors.avatar.message}</p>}

          <Label>Preferred Learning Style</Label>
          <Input
            {...register('preferredLearningStyle')}
            placeholder="Visual, Auditory, Reading/Writing, Kinesthetic"
          />

          <Label>Time Available Per Day</Label>
          <Input
            {...register('timeAvailablePerDay')}
            placeholder="e.g., 1 hour, 30 mins, 2 hours"
          />

          <Label>Learning Challenges</Label>
          <Textarea
            {...register('challenges')}
            placeholder="Attention span, scheduling, understanding concepts..."
          />

          <Button type="submit" className="w-full mt-4">
            Get Learning Plan Now
          </Button>
        </div>
      </form>
    </section>
  );
}
