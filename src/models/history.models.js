import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const historySchema = new Schema(
  {
    sessionId: {
      type: mongoose.Types.ObjectId,
      ref: 'Session',
    },
    owner: {
      type: 'String',
    },
    message: {
      type: String,
    },
    media: {
      type: [String],
    },
    snippit: {
      type: String,
    },
  },
  { timestamps: true }
);

const History = mongoose.models.Historys || mongoose.model('Historys', historySchema);

export default History;
