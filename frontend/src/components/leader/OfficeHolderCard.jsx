//src/components/leader/OfficeHolderCard.jsx
import React from 'react';
import { Card, Badge } from 'react-bootstrap';

export default function OfficeHolderCard({ leader }) {
  return (
    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4">
        <div className="text-uppercase small fw-semibold text-muted mb-1">Current office holder</div>
        <h5 className="fw-bold mb-2">{leader?.name || leader?.holderName || '—'}</h5>
        <Badge bg="secondary" className="mb-3">{leader?.party || leader?.department || 'Official'}</Badge>
        <p className="text-muted mb-0">{leader?.officeHolderBio || 'Add a verified bio from your backend.'}</p>
      </Card.Body>
    </Card>
  );
}