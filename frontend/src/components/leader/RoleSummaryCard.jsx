//src/components/leader/RoleSummaryCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

export default function RoleSummaryCard({ leader }) {
  return (
    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4">
        <div className="text-uppercase small fw-semibold text-muted mb-1">Role summary</div>
        <h5 className="fw-bold mb-3">What this office is for</h5>
        <p className="text-muted mb-0">{leader?.roleSummary || leader?.summary || 'No role summary available.'}</p>
      </Card.Body>
    </Card>
  );
}