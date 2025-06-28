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

interface HealthSessionDetails {
  symptoms: string;
  medicalHistory: string;
  avatar: string;
  reportsUrl: string;
  age: number;
  gender: string;
  doctorType: string;
  insuranceInfo: string;
}

export default function HealthcareAgentSession() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<HealthSessionDetails>();

  const selectedAvatar = watch('avatar', 'male');

  const onSubmit = async (data: HealthSessionDetails) => {
    try {
      const response = await axios.post('/api/c/c/agents/healthAgent', { data, user });
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
      <h1 className="text-xl font-bold mb-4">Book Your Health Consultation</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-[45%] p-4">
          <Label>Symptoms</Label>
          <Textarea
            {...register('symptoms', { required: 'Symptoms are required' })}
            placeholder="Describe your current health issues, e.g., fever, cough, fatigue..."
          />
          {errors.symptoms && <p className="text-red-500">{errors.symptoms.message}</p>}

          <Label className="mt-2">Medical History</Label>
          <Textarea
            {...register('medicalHistory')}
            placeholder="Any past illnesses, surgeries, allergies, etc."
          />

          <Label className="mt-2">Medical Reports (URL)</Label>
          <Input
            {...register('reportsUrl')}
            type="url"
            placeholder="Link to medical report (Google Drive, Dropbox, etc.)"
          />
        </div>

        <div className="w-full md:w-[45%] p-4 flex flex-col gap-2">
          <Label>Choose Your Agent Avatar</Label>
          <RadioGroup defaultValue="male" className="flex gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                value="male"
                className="hidden"
                {...register('avatar', { required: 'Avatar is required' })}
              />
              <Avatar className={`rounded-sm h-18 w-28 border-2 ${selectedAvatar === 'male' ? 'border-emerald-500' : 'border-transparent'}`}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Dr</AvatarFallback>
              </Avatar>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                value="female"
                className="hidden"
                {...register('avatar')}
              />
              <Avatar className={`rounded-sm h-18 w-28 border-2 ${selectedAvatar === 'female' ? 'border-emerald-500' : 'border-transparent'}`}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Dr</AvatarFallback>
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

          <Label>Gender</Label>
          <Input
            {...register('gender', { required: 'Gender is required' })}
            placeholder="Male / Female / Other"
          />

          <Label>Preferred Doctor Type</Label>
          <Input
            {...register('doctorType')}
            placeholder="General Physician, Dermatologist, etc."
          />

          <Label>Health Insurance Info</Label>
          <Input
            {...register('insuranceInfo')}
            placeholder="Enter your insurance provider or ID"
          />

          <Button type="submit" className="w-full mt-4">
            Start Health Session
          </Button>
        </div>
      </form>
    </section>
  );
}
