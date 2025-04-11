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

export default function InterviewSetup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const selectedAvatar = watch('avatar', 'male');
  const onSubmit = (data) => {
    console.log(data);
    router.push('/dashboard/interviewer/session/abx');
  };

  return (
    <section className="min-h-screen w-full  flex items-center justify-center flex-col p-4   ">
      <h1>Schedule Ypur Interview Now</h1>

      <div className="w-full h-full  min-h-[80%] max-h-[90%] flex justify-center   flex-col md:flex-row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-center w-full flex-col md:flex-row"
        >
          <div className="w-full md:w-[45%] p-4 ">
            <Label className="mt-2 ">Job Name</Label>
            <Input
              className=" "
              {...register('jobName', { required: 'Job Name is Required' })}
              type="text"
              placeholder="Frontend Developer at a fast-paced SaaS startup"
            />
            {errors.jobName && <p>{errors.jobName.message}</p>}

            <Label>Job Discription</Label>
            <Textarea
              className="min-h-100 max-h-100"
              {...register('jobDiscription', { required: 'Job Discrption is Required' })}
              placeholder="We are looking for a Frontend Developer with experience in building modern, responsive web applications using React.js. The ideal candidate should have strong problem-solving skills, a good eye for UI/UX, and the ability to work collaboratively in an agile environment."
            />
          </div>

          <div className="w-full md:w-[45%] h-full flex flex-col gap-2  p-4">
            <Label>Chose Your Avatar</Label>
            <RadioGroup
              defaultValue=" "
              className="flex items-center flex-wrap justify-start flex-row"
            >
              <div
                onClick={() => setValue('avatar', 'male')}
                className="flex items-center space-x-2 "
              >
                <Avatar
                  value="male"
                  className={`rounded-sm h-18 w-28 ${selectedAvatar == 'male' ? 'border-4 border-amber-50' : ''} `}
                >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div
                onClick={() => setValue('avatar', 'female')}
                className="flex items-center space-x-2 "
              >
                <Avatar
                  value="male"
                  className={`rounded-sm h-18 w-28 ${selectedAvatar == 'female' ? 'border-4 border-amber-50' : ''} `}
                >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </RadioGroup>

            <Label>Resume</Label>
            <Input type="file" />

            <Label>Years of Expirence</Label>
            <Input
              type="number"
              min={0}
              max={40}
              placeholder="3 (Enter total years of professional experience)"
            />

            <Label>LinkdIn Url </Label>
            <Input type="url" placeholder="https://www.linkedin.com/in/your-profile" />

            <Label>Skills </Label>
            <Input type="text" placeholder="React.js, JavaScript (ES6+), HTML5, CSS3, REST APIs" />

            <Button className="w-full mt-4">Start Interview Now</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
