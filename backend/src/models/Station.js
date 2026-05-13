import mongoose from 'mongoose';

const StationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, unique: true },
    county: { type: String, required: true, trim: true },
    constituency: { type: String, required: true, trim: true },
    ward: { type: String, required: true, trim: true },
    openHours: { type: String, default: '6:00 AM - 5:30 PM' },
    isOpen: { type: Boolean, default: true },

    lat: { type: Number, required: true },
    lng: { type: Number, required: true },

    mapX: { type: String, default: '50%' },
    mapY: { type: String, default: '50%' },
  },
  { timestamps: true }
);

StationSchema.index({ name: 'text', code: 'text', county: 'text', constituency: 'text', ward: 'text' });

export default mongoose.model('Station', StationSchema);