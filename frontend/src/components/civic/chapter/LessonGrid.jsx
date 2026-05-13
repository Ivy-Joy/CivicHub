import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Book } from 'lucide-react';

export default function LessonGrid({ lessons, onOpenLesson }) {
  return (
    <div className="d-grid gap-3">
      {lessons.map((lesson) => (
        <Card key={lesson._id || lesson.slug} className="border-0 shadow-sm" style={{ borderRadius: 22 }}>
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
              <div className="d-flex gap-3">
                <div className="rounded-4 d-flex align-items-center justify-content-center bg-light" style={{ width: 52, height: 52 }}>
                  <Book size={22} />
                </div>
                <div>
                  <div className="text-uppercase small fw-semibold text-muted mb-1">{lesson.topic}</div>
                  <h5 className="fw-bold mb-1">{lesson.title}</h5>
                  <p className="text-muted mb-0">{lesson.summary}</p>
                </div>
              </div>
              <div className="d-flex flex-column align-items-end gap-2">
                <Badge bg="primary">{lesson.level}</Badge>
                <Button size="sm" onClick={() => onOpenLesson(lesson)}>Open lesson</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}