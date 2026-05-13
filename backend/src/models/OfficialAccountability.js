import mongoose from 'mongoose';

const OfficialAccountabilitySchema = new mongoose.Schema(
  {
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Area',
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    office: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: 'Active',
      trim: true,
    },
    lastUpdate: {
      type: String,
      default: '',
      trim: true,
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('OfficialAccountability', OfficialAccountabilitySchema);