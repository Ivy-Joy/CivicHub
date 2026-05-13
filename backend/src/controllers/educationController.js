import EducationChapter from '../models/EducationChapter.js';
import EducationLesson from '../models/EducationLesson.js';

export async function getEducationHub(req, res) {
  try {
    const chapters = await EducationChapter.find().sort({ order: 1, createdAt: 1 }).lean();
    const lessons = await EducationLesson.find().sort({ order: 1, createdAt: 1 }).lean();

    const mapped = chapters.map((chapter) => ({
      ...chapter,
      lessons: lessons.filter((lesson) => String(lesson.chapter) === String(chapter._id)),
    }));

    return res.json({
      data: {
        chapters: mapped,
      },
    });
  } catch (error) {
    console.error('getEducationHub error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function getLessonBySlug(req, res) {
  try {
    const { slug } = req.params;

    const lesson = await EducationLesson.findOne({ slug }).lean();
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    return res.json({ data: lesson });
  } catch (error) {
    console.error('getLessonBySlug error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}