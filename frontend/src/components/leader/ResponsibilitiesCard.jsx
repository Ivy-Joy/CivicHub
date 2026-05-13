//src/components/leader/ResponsibilitiesCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

export default function ResponsibilitiesCard({ leader }) {
  return (
    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4">
        <div className="text-uppercase small fw-semibold text-muted mb-1">Responsibilities</div>
        <h5 className="fw-bold mb-3">What this office controls</h5>
        <ul className="mb-0 text-muted">
          {(leader?.controls || []).length ? leader.controls.map((item, index) => <li key={index}>{item}</li>) : <li>No control details available.</li>}
        </ul>
      </Card.Body>
    </Card>
  );
}