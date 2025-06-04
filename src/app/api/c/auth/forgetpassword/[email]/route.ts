import { dbConnect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model';
import { sendResetPasswordEmail } from '@/helpers/sendMail';
import { generateResetToken, verifyResetToken } from '@/helpers/generateResetToken';

dbConnect();

// Forgot Password - Send Email
export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const {email} = await params;
    

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Email not found. User not registered." },
        { status: 404 }
      );
    }

    const token = await generateResetToken(user._id);
    await sendResetPasswordEmail(user.email, token);

    return NextResponse.json(
      { message: "Reset Password link sent to your email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};

