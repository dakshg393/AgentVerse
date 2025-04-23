'use client';

import { Button } from '@/components/(shadcn)/ui/button';
import { Input } from '@/components/(shadcn)/ui/input';
import { Label } from '@/components/(shadcn)/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/(shadcn)/ui/radio-group';

import { Switch } from '@/components/(shadcn)/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/(shadcn)/ui/card';
import { Textarea } from '@/components/(shadcn)/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/(shadcn)/ui/avatar';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useUserStore from '@/store/userStore';
import toast from 'react-hot-toast';

export default function InterviewSetup() {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const selectedAvatar = watch('avatar', 'male');

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // const formData = new FormData();

      const response = await axios.post('/api/c/agents/interviewAgent', { data, user });
      // console.log('Here this is response', JSON.stringify(response));
      toast.success(response.data.message);
      router.push(`/dashboard/interviewer/session/${response?.data?.data?._id}`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error has occurred.');
      }
    }

    // router.push('/dashboard/interviewer/session/abx');
  };

  return (
    <section className="min-h-screen w-full  flex items-center justify-center flex-col p-4 ">
      <h1>Schedule Ypur Interview Now</h1>

      <div className="w-full h-full  min-h-[80%] max-h-[90%] flex justify-center   flex-col md:flex-row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-center w-full flex-col md:flex-row"
        >
          <div className="w-full md:w-[45%] p-4 ">
            <Label className="mt-2 ">Job Title</Label>
            <Input
              className=" "
              {...register('jobTitle', { required: 'Job Name is Required' })}
              type="text"
              placeholder="Frontend Developer at a fast-paced SaaS startup"
            />
            {errors.jobTitle && <p className="text-red-500">{errors.jobTitle.message}</p>}

            <Label>Job Discription</Label>
            <Textarea
              className="min-h-100 max-h-100 "
              {...register('jobDiscription', { required: 'Job Discrption is Required' })}
              placeholder="We are looking for a Frontend Developer with experience in building modern, responsive web applications using React.js. The ideal candidate should have strong problem-solving skills, a good eye for UI/UX, and the ability to work collaboratively in an agile environment."
            />
            {errors.jobDiscription && (
              <p className="text-red-500">{errors.jobDiscription.message}</p>
            )}
          </div>

          <div className="w-full md:w-[45%] h-full flex flex-col gap-2  p-4">
            <Label>Chose Your Avatar</Label>

            <RadioGroup
              defaultValue="male"
              {...register('avatar', { required: 'Avatar is required' })}
              className="flex gap-4 overflow-y-scroll no-scrollbar"
            >
              <label className="cursor-pointer">
                <input type="radio" value="male" className="hidden" {...register('avatar')} />
                <Avatar
                  className={`rounded-sm h-18 w-28 border-2 ${
                    watch('avatar') === 'male' ? 'border-amber-500' : 'border-transparent'
                  }`}
                >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </label>

              <label className="cursor-pointer">
                <input type="radio" value="female" className="hidden" {...register('avatar')} />
                <Avatar
                  className={`rounded-sm h-18 w-28 border-2 ${
                    watch('avatar') === 'female' ? 'border-amber-500' : 'border-transparent'
                  }`}
                >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </label>

              <label className="cursor-pointer">
                <input type="radio" value="female" className="hidden" {...register('avatar')} />
                <Avatar
                  className={`rounded-sm h-18 w-28 border-2 ${
                    watch('avatar') === 'female' ? 'border-amber-500' : 'border-transparent'
                  }`}
                >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </label>

              <label className="cursor-pointer">
                <input type="radio" value="female" className="hidden" {...register('avatar')} />
                <Avatar
                  className={`rounded-sm h-18 w-28 border-2 ${
                    watch('avatar') === 'female' ? 'border-amber-500' : 'border-transparent'
                  }`}
                >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </label>

              <label className="cursor-pointer">
                <input type="radio" value="female" className="hidden" {...register('avatar')} />
                <Avatar
                  className={`rounded-sm h-18 w-28 border-2 ${
                    watch('avatar') === 'female' ? 'border-amber-500' : 'border-transparent'
                  }`}
                >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </label>

              <label className="cursor-pointer">
                <input type="radio" value="female" className="hidden" {...register('avatar')} />
                <Avatar
                  className={`rounded-sm h-18 w-28 border-2 ${
                    watch('avatar') === 'female' ? 'border-amber-500' : 'border-transparent'
                  }`}
                >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </label>
            </RadioGroup>
            {errors.avatar && <p className="text-red-500">{errors.avatar.message}</p>}
            <Label>Resume</Label>
            <Input
              type="url"
              {...register('resume')}
              placeholder="Your Resume Doc Url Make Sure its Public"
            />
            {errors.resume && <p className="text-red-500">{errors.resume.message}</p>}

            <Label>Years of Expirence</Label>
            <Input
              {...register('yearOfExperience', { required: 'Year of Experience Required' })}
              type="number"
              min={0}
              max={40}
              placeholder="3 (Enter total years of professional experience)"
            />
            {errors.yearOfExperience && (
              <p className="text-red-500">{errors.yearOfExperience.message}</p>
            )}

            <Label>LinkdIn Url </Label>
            <Input
              {...register('linkdinUrl', { required: 'Linkdin Url is required' })}
              type="url"
              placeholder="https://www.linkedin.com/in/your-profile"
            />
            {errors.linkdinUrl && <p className="text-red-500">{errors.linkdinUrl.message}</p>}

            <Label>Skills </Label>
            <Input
              {...register('skills', { required: 'Skills are required' })}
              type="text"
              placeholder="React.js, JavaScript (ES6+), HTML5, CSS3, REST APIs"
            />
            {errors.skills && <p className="text-purple-600">{errors.skills.message}</p>}

            <Button type="submit" className="w-full mt-4">
              Start Interview Now
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
