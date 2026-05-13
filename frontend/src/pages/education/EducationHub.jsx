import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import ChapterSidebar from '../../components/civic/chapter/ChapterSidebar';
import LessonGrid from '../../components/civic/chapter/LessonGrid';
import LessonDrawer from '../../components/civic/chapter/LessonDrawer';
import { civicHubApi } from '../../services/civicHubApi';

export default function EducationHub() {
  const [chapters, setChapters] = useState([]);
  const [activeChapter, setActiveChapter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showLesson, setShowLesson] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await civicHubApi.getEducationHub();
        const payload = data?.data || data;
        setChapters(payload.chapters || []);
        setActiveChapter(payload.chapters?.[0] || null);
      } catch (err) {
        setError(err.message || 'Could not load education hub');
      }
    }
    load();
  }, []);

  const lessons = useMemo(() => activeChapter?.lessons || [], [activeChapter]);

  const openLesson = async (lesson) => {
    try {
      if (lesson?.slug) {
        const data = await civicHubApi.getLessonBySlug(lesson.slug);
        setSelectedLesson(data?.data || lesson);
      } else {
        setSelectedLesson(lesson);
      }
      setShowLesson(true);
    } catch {
      setSelectedLesson(lesson);
      setShowLesson(true);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #eef3f9 100%)', minHeight: '100vh' }}>
      <Container className="py-4 py-lg-5">
        <Row className="g-4">
          <Col lg={4}>
            <ChapterSidebar
              chapters={chapters}
              activeChapterId={activeChapter?._id || activeChapter?.slug}
              onSelectChapter={setActiveChapter}
            />
          </Col>

          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 24 }}>
              <Card.Body className="p-4 p-md-5">
                <div className="text-uppercase small fw-semibold text-muted mb-1">Education Hub</div>
                <h2 className="fw-bold mb-2">{activeChapter?.title || 'Civic Education'}</h2>
                <p className="text-muted mb-0">
                  Learn one chapter at a time, then open a lesson for plain-language explanations and examples.
                </p>
              </Card.Body>
            </Card>

            {error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <LessonGrid lessons={lessons} onOpenLesson={openLesson} />
            )}
          </Col>
        </Row>
      </Container>

      <LessonDrawer show={showLesson} onHide={() => setShowLesson(false)} lesson={selectedLesson} />
    </div>
  );
}