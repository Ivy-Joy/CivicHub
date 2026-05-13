import React from 'react';
import { Offcanvas, Badge, Button } from 'react-bootstrap';

export default function LessonDrawer({ show, onHide, lesson }) {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end" style={{ width: 'min(560px, 100vw)' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{lesson?.title || 'Lesson'}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {lesson ? (
          <>
            <Badge bg="secondary" className="mb-3">{lesson.topic}</Badge>
            <p className="text-muted">{lesson.summary}</p>

            <div className="p-3 bg-light rounded-4 mb-3">
              <div className="fw-semibold mb-1">Plain-language explanation</div>
              <div className="small text-muted">{lesson.explainer}</div>
            </div>

            <div className="p-3 bg-light rounded-4 mb-3">
              <div className="fw-semibold mb-1">Example</div>
              <div className="small text-muted">{lesson.example}</div>
            </div>

            <div className="p-3 bg-light rounded-4 mb-3">
              <div className="fw-semibold mb-1">What this means for a citizen</div>
              <div className="small text-muted">{lesson.citizenTakeaway}</div>
            </div>

            <div className="d-grid">
              <Button variant="outline-primary">Save lesson</Button>
            </div>
          </>
        ) : null}
      </Offcanvas.Body>
    </Offcanvas>
  );
}