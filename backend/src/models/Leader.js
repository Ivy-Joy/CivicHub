//backend/src/models/Leader.js
import mongoose from 'mongoose';

const LeaderSchema = new mongoose.Schema(
  {
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true },

    office: {
      type: String,
      required: true,
      enum: ['Governor', 'Senator', 'Woman Rep', 'MP', 'MCA', 'Chief'],
    },
    name: { type: String, required: true, trim: true },
    party: { type: String, trim: true, default: '' },
    department: { type: String, trim: true, default: '' },

    roleSummary: { type: String, default: '' },
    controls: [{ type: String }],
    doesNotControl: [{ type: String }],
    manifestoHighlights: [{ type: String }],
    officeHolderBio: { type: String, default: '' },
    comparisonTags: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

LeaderSchema.index({ area: 1, office: 1 });

export default mongoose.model('Leader', LeaderSchema);