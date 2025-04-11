import mongoose, { Schema } from 'mongoose';

const interviewSchema = new Schema(
  {
    jobTitle: {
      type: String,
    },
    jobDiscription: {
      type: String,
    },
    avatar: {
      type: String,
      enum: ['Male', 'Female'],
    },
    resume: {
      type: [String],
    },
    skills: {
      type: String,
    },
    linkdinUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Interview = mongoose.models.interviews || mongoose.model('interview', interviewSchema);

export default Interview;
