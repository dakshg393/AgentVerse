import { dbConnect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model';
import { sendResetPasswordEmail } from '@/helpers/sendMail';
import { generateResetToken, verifyResetToken } from '@/helpers/generateResetToken';

dbConnect();


// Reset Password - Update Password
export const POST = async (request: NextRequest) => {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }

    const decoded = await verifyResetToken(token);

    const user = await User.findById(decoded._id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.password = password;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully. Please login." },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
