"use client"

import { Button } from '@/components/(shadcn)/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/(shadcn)/ui/card';
import {Input} from '@/components/(shadcn)/ui/input';
import useUserStore from '@/store/userStore';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/(shadcn)/ui/input-otp";
import {useState} from 'react';



export default function VerificationPage() {


  const user = useUserStore((state)=>state?.user)
  const [getOtp,setOtp] = useState("")

  const handleChange(value:String)=>{
    setOtp(otp)
  }
  return (
    <section className="flex items-center justify-center flex-col  p-4 min-h-screen pb-16">
 
      <div className="flex justify-center items-center flex-col md:flex-row gap-4">
       
            <Card>
              <CardHeader className="flex justify-center items-center flex-col">
                <CardTitle>Please verfiy User Email </CardTitle>
                <CardDescription className="text-center">Plase verfiy</CardDescription>
              </CardHeader>
              <CardContent>
                <form action="">
                  <Input value={user?.email} frezz/>


                    <div>
                     
                    </div>
                </form>
                  
              </CardContent>
              <CardFooter>
                
              </CardFooter>
            </Card>
          
      </div>
    </section>
  );
}
