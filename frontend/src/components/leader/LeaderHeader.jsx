//src/components/leader/LeaderHeader.jsx
import React from 'react';
import { Badge, Card } from 'react-bootstrap';

export default function LeaderHeader({ leader }) {
  if (!leader) return null;

  return (
    <Card className="border-0 shadow-sm mb-3" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4 p-md-5">
        <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
          <div>
            <Badge bg="light" text="dark" className="mb-2 border rounded-pill px-3 py-2">
              {leader.office}
            </Badge>
            <h2 className="fw-bold mb-1">{leader.name || leader.holderName || '—'}</h2>
            <div className="text-muted">{leader.party || leader.department || 'Current office holder'}</div>
          </div>
          <Badge bg="primary" className="rounded-pill px-3 py-2">Profile</Badge>
        </div>
      </Card.Body>
    </Card>
  );
}