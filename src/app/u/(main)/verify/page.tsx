'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/(shadcn)/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/(shadcn)/ui/card';
import { Input } from '@/components/(shadcn)/ui/input';
import { Label } from '@/components/(shadcn)/ui/label';

import useUserStore from '@/store/userStore';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from  '@/components/(shadcn)/ui/input-otp';
import {REGEXP_ONLY_DIGITS} from 'input-otp';
import toast from 'react-hot-toast';
import axios from 'axios';

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must contain only digits'),
});

type FormData = z.infer<typeof otpSchema>;

export default function VerificationPage() {
  const user = useUserStore((state) => state?.user);
  const [value, setValue] = useState("")
  const [isOtpSend,setOtpSend] = useState(false)
  const [timer,setTimer] = useState(0)
  const [message,setMessage] = useState("")
  const [isDisabled, setIsDisabled] = useState(false);
   useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);
  // Start resend timer on mount or when otpSent changes

  const sendOtp=async()=>{
    if(timer===0){
      setIsDisabled(true)
      const getOtp = await axios.get(`/api/c/auth/verify/${user?._id}`);
      console.log(getOtp.data)
      toast.success("OTP Send Successfully")
      // setMessage(`OTP Send Successfully to ${user?.email}`)
      setTimer(30)
      setOtpSend(true)
    }else{
      toast.error("OTP Alredy Send Wait For 30 Seconds")
    }
  }
  const verifyOtp= async ()=>{
    try {
      if(value.length === 6){
        const response = await axios.post(`/api/c/auth/verify/${user?._id}`,{otp:value})
        console.log(response.data)
        setValue("")
        toast.success("Otp Verified Successfully")
      }else{
        toast.error("Please Enter the Otp")
      }
    } catch (error) {
      toast.error("Somthing Went Wrong While Verify Otp")
    }
  }

  return (
    <section className="flex items-center justify-center flex-col p-4 min-h-screen pb-16">
      <div className="flex justify-center items-center flex-col md:flex-row gap-4 w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="flex justify-center items-start flex-col">
            <CardTitle>Please verify your Email</CardTitle>
            <CardDescription className="text-center mb-2">
              Please enter the one-time password sent to your phone.
            </CardDescription>
          </CardHeader>
          <CardContent>
           
            <div className="space-y-2 flex-row">
              <InputOTP pattern={REGEXP_ONLY_DIGITS} maxLength={6} value={value} onChange={(value) => setValue(value)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <span>{message}</span>
            </div>
            
          </CardContent>
          <CardFooter className='flex flex-row gap-3'>
            <Button onClick={sendOtp} disabled={timer>0}  className='px-4'>   {timer > 0 ? `(${timer}s)` : isOtpSend ? "Resend Otp" : "Send Otp" }</Button>
          <Button onClick={verifyOtp} disabled={value.length !== 6 || !isOtpSend}>  Verify </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
