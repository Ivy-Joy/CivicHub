import mongoose from 'mongoose';

const DonationCampaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    purpose: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['platform', 'maintenance', 'disbursement', 'education', 'community'],
    },
    targetAmount: { type: Number, default: 0 },
    raisedAmount: { type: Number, default: 0 },
    disbursedAmount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    allocationDescription: { type: String, default: '' },
    priorityOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('DonationCampaign', DonationCampaignSchema);