//src/components/leader/ManifestoHighlights.jsx
import React from 'react';
import { Card, Badge } from 'react-bootstrap';

export default function ManifestoHighlights({ leader }) {
  const highlights = Array.isArray(leader?.manifestoHighlights)
    ? leader.manifestoHighlights
    : leader?.manifestoHighlights
    ? [leader.manifestoHighlights]
    : [];

  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4">
        <div className="text-uppercase small fw-semibold text-muted mb-1">Manifesto highlights</div>
        <h5 className="fw-bold mb-3">What the leader says they will do</h5>

        <div className="d-grid gap-2">
          {highlights.length ? highlights.map((item, index) => (
            <div key={index} className="p-3 bg-light rounded-4 d-flex justify-content-between align-items-start gap-3">
              <div className="text-muted small">{item}</div>
              <Badge bg="primary">Promise</Badge>
            </div>
          )) : <div className="text-muted">No manifesto highlights available.</div>}
        </div>
      </Card.Body>
    </Card>
  );
}