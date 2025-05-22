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
import {generateInterviewPrompt} from '@/lib/client/generateInterviewPrompt';

interface InterviewDetails {
  jobTitle: string;
  jobDiscription: string;
  avatar: string;
  resume: string;
  yearOfExperience: string;
  linkdinUrl: string;
  skills: string;
}

export default function InterviewSession() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InterviewDetails>();

  const selectedAvatar = watch('avatar', 'male');

  const onSubmit = async (data: InterviewDetails) => {
    try {
      const prompt=generateInterviewPrompt(data)
      console.log(prompt)
      const response = await axios.post('/api/c/c/agents/interviewAgent', { data,user,prompt });
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
      <h1 className="text-xl font-bold mb-4">Schedule Your Interview Now</h1>

      <div className="w-full h-full min-h-[80%] max-h-[90%] flex justify-center flex-col md:flex-row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-center w-full flex-col md:flex-row"
        >
          <div className="w-full md:w-[45%] p-4">
            <Label className="mt-2">Job Title</Label>
            <Input
              {...register('jobTitle', { required: 'Job Title is required' })}
              type="text"
              placeholder="Frontend Developer at a fast-paced SaaS startup"
            />
            {typeof errors.jobTitle?.message === 'string' && (
              <p className="text-red-500">{errors.jobTitle.message}</p>
            )}

            <Label>Job Description</Label>
            <Textarea
              className="min-h-100 max-h-100"
              {...register('jobDiscription', { required: 'Job Description is required' })}
              placeholder="We are looking for a Frontend Developer with experience in building modern, responsive web applications using React.js. The ideal candidate should have strong problem-solving skills..."
            />
            {typeof errors.jobDiscription?.message === 'string' && (
              <p className="text-red-500">{errors.jobDiscription.message}</p>
            )}
          </div>

          <div className="w-full md:w-[45%] h-full flex flex-col gap-2 p-4">
            <Label>Choose Your Avatar</Label>
            <RadioGroup
              defaultValue="male"
              className="flex gap-4 overflow-y-scroll no-scrollbar"
            >
              <label className="cursor-pointer">
                <input type="radio" value="male" className="hidden" {...register('avatar', { required: 'Avatar is required' })} />
                <Avatar className={`rounded-sm h-18 w-28 border-2 ${selectedAvatar === 'male' ? 'border-amber-500' : 'border-transparent'}`}>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </label>

              <label className="cursor-pointer">
                <input type="radio" value="female" className="hidden" {...register('avatar')} />
                <Avatar className={`rounded-sm h-18 w-28 border-2 ${selectedAvatar === 'female' ? 'border-amber-500' : 'border-transparent'}`}>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </label>
            </RadioGroup>
            {typeof errors.avatar?.message === 'string' && (
              <p className="text-red-500">{errors.avatar.message}</p>
            )}

            <Label>Resume</Label>
            <Input
              type="url"
              {...register('resume')}
              placeholder="Your Resume Doc URL (Make sure it's public)"
            />
            {typeof errors.resume?.message === 'string' && (
              <p className="text-red-500">{errors.resume.message}</p>
            )}

            <Label>Years of Experience</Label>
            <Input
              {...register('yearOfExperience', { required: 'Years of Experience is required' })}
              type="number"
              min={0}
              max={40}
              placeholder="3 (Enter total years of professional experience)"
            />
            {typeof errors.yearOfExperience?.message === 'string' && (
              <p className="text-red-500">{errors.yearOfExperience.message}</p>
            )}

            <Label>LinkedIn URL</Label>
            <Input
              {...register('linkdinUrl', { required: 'LinkedIn URL is required' })}
              type="url"
              placeholder="https://www.linkedin.com/in/your-profile"
            />
            {typeof errors.linkdinUrl?.message === 'string' && (
              <p className="text-red-500">{errors.linkdinUrl.message}</p>
            )}

            <Label>Skills</Label>
            <Input
              {...register('skills', { required: 'Skills are required' })}
              type="text"
              placeholder="React.js, JavaScript (ES6+), HTML5, CSS3, REST APIs"
            />
            {typeof errors.skills?.message === 'string' && (
              <p className="text-red-500">{errors.skills.message}</p>
            )}

            <Button type="submit" className="w-full mt-4">
              Start Interview Now
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
