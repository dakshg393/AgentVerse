import mongoose, { Schema } from 'mongoose';

const otpSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // ensures one active OTP per user
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // auto-delete after 10 minutes
    },
  },
  {
    timestamps: false,
  }
);



const Otp = mongoose.models.Otp || mongoose.model('Otp', otpSchema);

export default Otp;
