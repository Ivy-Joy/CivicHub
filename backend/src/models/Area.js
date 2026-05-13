import mongoose from 'mongoose';

const AreaSchema = new mongoose.Schema(
  {
    county: { type: String, required: true, trim: true },
    constituency: { type: String, required: true, trim: true },
    ward: { type: String, required: true, trim: true },

    station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
    leaders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Leader' }],

    metrics: {
      leadersCount: { type: Number, default: 0 },
      manifestosCount: { type: Number, default: 0 },
      reportsCount: { type: Number, default: 0 },
      petitionsCount: { type: Number, default: 0 },
    },

    accountability: {
      budgetProgress: { type: Number, default: 0 },
      procurementCount: { type: Number, default: 0 },
      reportsCount: { type: Number, default: 0 },
      items: [
        {
          title: String,
          status: String,
        },
      ],
    },

    manifestoCompare: [
      {
        office: String,
        theme: String,
        highlight: String,
      },
    ],
  },
  { timestamps: true }
);

AreaSchema.index({ county: 1, constituency: 1, ward: 1 });

export default mongoose.model('Area', AreaSchema);