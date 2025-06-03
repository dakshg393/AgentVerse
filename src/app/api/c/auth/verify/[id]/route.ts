import Otp from "@/models/otp.model";
import User from "@/models/user.model";
import { sendOtpEmail } from "@/helpers/sendMail";
import { NextRequest, NextResponse } from "next/server";
import {dbConnect} from "@/dbConfig/dbConfig";
import crypto from 'crypto';


export const dynamic = 'force-dynamic';
// GET handler for dynamic route /api/send-otp/[id]

dbConnect();
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } =await  params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const otp = await crypto.randomInt(0, 1000000).toString().padStart(6, '0');

    const getOtp = await Otp.findOneAndUpdate(
      { user: id },
      {
        otp:otp,
        createdAt: new Date(), // reset TTL
      },
      {
        upsert: true,
        new: true,
      }
    );

    console.log(`Herre is otp ${JSON.stringify(getOtp)}`)
    const mailSent = await sendOtpEmail(user.email, getOtp.otp);

    if (mailSent) {
      return NextResponse.json(
        {
          message: `OTP sent successfully to ${user.email}`
         
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Failed to send OTP email" }, { status: 500 });
  } catch (error) {
    console.error("OTP Send Error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req:NextRequest, { params }: { params: { id: string } }){

  try {
    const { id } =await params;

    const {otp} = await req.json();
    console.log(`${otp},${id}`)
    const otpDoc = await Otp.findOne({ user: id });
      if (!otpDoc) {
      return NextResponse.json(
        { message: "OTP expired or not found" },
        { status: 401 }
      );
    }
     if (otp === otpDoc.otp) {
      await User.findByIdAndUpdate(id, { isVerified: true });

      // Optional: Delete OTP after successful verification
      await Otp.deleteOne({ user: id });

      return NextResponse.json(
        { message: "User Verified Successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Invalid OTP" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong while verifying OTP" },
      { status: 500 }
    );
  }

}