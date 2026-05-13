import mongoose from 'mongoose';

const PollResultSchema = new mongoose.Schema(
  {
    option: {
      type: String,
      required: true,
      trim: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const PublicPollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Area',
      default: null,
    },
    options: [
      {
        type: String,
        trim: true,
      },
    ],
    results: [PollResultSchema],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('PublicPoll', PublicPollSchema);