//backend/src/models/AccountabilityItem.js
import mongoose from 'mongoose';

const AccountabilityItemSchema = new mongoose.Schema(
  {
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Area',
      default: null,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    vendor: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      default: 'Planned',
      enum: ['Planned', 'In progress', 'Released', 'Completed', 'Delayed'],
    },
    amount: {
      type: Number,
      default: 0,
    },
    amountLabel: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      default: 'Public spending',
      trim: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    note: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('AccountabilityItem', AccountabilityItemSchema);