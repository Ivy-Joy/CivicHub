import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';

export default function ChapterSidebar({ chapters, activeChapterId, onSelectChapter }) {
  return (
    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4">
        <div className="text-uppercase small fw-semibold text-muted mb-2">Education Hub</div>
        <h4 className="fw-bold mb-3">Chapters</h4>

        <ListGroup variant="flush">
          {chapters.map((chapter) => (
            <ListGroup.Item
              key={chapter._id || chapter.slug}
              action
              active={String(activeChapterId) === String(chapter._id || chapter.slug)}
              onClick={() => onSelectChapter(chapter)}
              className="d-flex justify-content-between align-items-center py-3"
              style={{ cursor: 'pointer' }}
            >
              <div>
                <div className="fw-semibold">{chapter.title}</div>
                <div className="small opacity-75">{chapter.subtitle}</div>
              </div>
              <Badge bg="light" text="dark" className="border">
                {chapter.lessons?.length || 0}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}