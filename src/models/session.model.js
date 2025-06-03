import mongoose, { Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    title: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    agentType: {
      type: String,
      enum: ['Aiagent', 'Healthcare', 'Legal', 'Custom'],
      required: true,
    },
    agentTypeRef: {
      type: String,
      required: true,
      enum: ['Interview', 'HelthcareAgent', 'LegalAgent'],
    },
    domainData: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'agentTypeRef', // dynamically refer to correct model
    },
    status: {
      type: String,
      enum: ['Start', 'Resume', 'End'],
      default: 'Start',
    },
    prompt: {
      type: String,
    },
    summery: {
      type: String,
    },
  },
  { timestamps: true }
);

const Session = mongoose.models.sessions || mongoose.model('sessions', sessionSchema);

export default Session;
