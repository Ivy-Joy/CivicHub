import mongoose from 'mongoose';

const CitizenActivitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      required: true,
      enum: [
        'profile',
        'station',
        'leader',
        'petition',
        'poll',
        'consultation',
        'message',
        'report',
        'donation',
      ],
    },
    title: { type: String, required: true },
    detail: { type: String, default: '' },
    sourceSection: { type: String, default: '' },
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model('CitizenActivity', CitizenActivitySchema);