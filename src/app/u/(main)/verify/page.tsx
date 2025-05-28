"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/(shadcn)/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/(shadcn)/ui/card";
import { Input } from "@/components/(shadcn)/ui/input";
import { Label } from "@/components/(shadcn)/ui/label";

import useUserStore from "@/store/userStore";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

type FormData = z.infer<typeof otpSchema>;

export default function VerificationPage() {
  const user = useUserStore((state) => state?.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(otpSchema),
  });

  const [resendAllowed, setResendAllowed] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [otpSent, setOtpSent] = useState(false);

  // Start resend timer on mount or when otpSent changes
  useEffect(() => {
    if (!otpSent) return;

    setResendAllowed(false);
    setResendTimer(30);

    const interval = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setResendAllowed(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent]);

  const sendOtp = () => {
    // Placeholder: call API to send OTP
    console.log("Sending OTP to", user?.email);
    setOtpSent(true);
    reset();
  };

  const verifyOtp = (data: FormData) => {
    // Placeholder: call API to verify OTP
    console.log("Verifying OTP:", data.otp);
    // On success, maybe redirect or show success message
  };

  return (
    <section className="flex items-center justify-center flex-col p-4 min-h-screen pb-16">
      <div className="flex justify-center items-center flex-col md:flex-row gap-4 w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="flex justify-center items-center flex-col">
            <CardTitle>Please verify your Email</CardTitle>
            <CardDescription className="text-center mb-2">
              Enter the 6-digit code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(verifyOtp)} noValidate>
              <Label>Email</Label>
              <Input value={user?.email || ""} readOnly disabled className="mb-4" />

              <Label>OTP</Label>
              <Input
                type="text"
                inputMode="numeric"
                maxLength={6}
                {...register("otp")}
                aria-invalid={errors.otp ? "true" : "false"}
              />
              {errors.otp && (
                <p className="text-red-600 mt-1 text-sm">{errors.otp.message}</p>
              )}

              <div className="flex justify-between items-center mt-4">
                <Button type="submit" disabled={!isValid}>
                  Verify
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={!resendAllowed}
                  onClick={sendOtp}
                >
                  {resendAllowed ? "Resend OTP" : `Resend in ${resendTimer}s`}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            {/* Optional footer content */}
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
