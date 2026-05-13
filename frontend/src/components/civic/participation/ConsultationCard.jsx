import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function ConsultationCard({ consultation, onOpen }) {
  return (
    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4">
        <div className="text-uppercase small fw-semibold text-muted mb-1">Public consultation</div>
        <h5 className="fw-bold mb-2">{consultation.title}</h5>
        <p className="text-muted small">{consultation.summary}</p>
        <Button variant="outline-primary" onClick={() => onOpen(consultation)}>Join consultation</Button>
      </Card.Body>
    </Card>
  );
}