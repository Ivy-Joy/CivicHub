import mongoose from 'mongoose';

const SupportDisbursementSchema = new mongoose.Schema(
  {
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'DonationCampaign', required: true },
    title: { type: String, required: true },
    category: { type: String, default: 'maintenance' },
    amount: { type: Number, required: true },
    amountLabel: { type: String, default: '' },
    status: { type: String, default: 'Planned', enum: ['Planned', 'Approved', 'Released', 'Completed'] },
    note: { type: String, default: '' },
    disbursedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model('SupportDisbursement', SupportDisbursementSchema);