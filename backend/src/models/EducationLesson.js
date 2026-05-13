import mongoose from 'mongoose';

const EducationLessonSchema = new mongoose.Schema(
  {
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EducationChapter',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    topic: {
      type: String,
      default: '',
      trim: true,
    },
    level: {
      type: String,
      default: 'Citizen',
      trim: true,
    },
    summary: {
      type: String,
      default: '',
      trim: true,
    },
    explainer: {
      type: String,
      default: '',
      trim: true,
    },
    example: {
      type: String,
      default: '',
      trim: true,
    },
    citizenTakeaway: {
      type: String,
      default: '',
      trim: true,
    },
    articleRef: {
      type: String,
      default: '',
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('EducationLesson', EducationLessonSchema);