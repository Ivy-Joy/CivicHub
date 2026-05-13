import mongoose from 'mongoose';

const ConsultationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      default: '',
      trim: true,
    },
    body: {
      type: String,
      default: '',
      trim: true,
    },
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Area',
      default: null,
    },
    open: {
      type: Boolean,
      default: true,
    },
    deadline: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Consultation', ConsultationSchema);