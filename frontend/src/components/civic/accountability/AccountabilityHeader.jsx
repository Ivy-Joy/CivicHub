import React from 'react';
import { Card, Badge } from 'react-bootstrap';

export default function AccountabilityHeader({ area }) {
  return (
    <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4 p-md-5">
        <div className="text-uppercase small fw-semibold text-muted mb-1">Accountability Hub</div>
        <h2 className="fw-bold mb-2">Track money, procurement, and follow-through</h2>
        <p className="text-muted mb-0">
          View public spending, procurement status, complaints, and official accountability in one place.
        </p>
      </Card.Body>
    </Card>
  );
}