import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema(
  {
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'DonationCampaign', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

    donorName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },

    amount: { type: Number, required: true },
    anonymous: { type: Boolean, default: false },
    paymentReference: { type: String, default: '' },
    note: { type: String, default: '' },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Failed'] },
  },
  { timestamps: true }
);

export default mongoose.model('Donation', DonationSchema);