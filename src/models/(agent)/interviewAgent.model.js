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
      enum: ['male', 'female'],
    },
    resume: {
      type: [String],
    },
    yearOfExperience: {
      type: Number,
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

const Interview = mongoose.models.interviews || mongoose.model('interviews', interviewSchema);

export default Interview;
