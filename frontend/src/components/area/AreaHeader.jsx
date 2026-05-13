//src/components/area/AreaHeader.jsx
import React from 'react';
import { Badge, Card } from 'react-bootstrap';

export default function AreaHeader({ area }) {
  if (!area) return null;

  return (
    <Card className="border-0 shadow-sm mb-3" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4 p-md-5">
        <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
          <div>
            <Badge bg="light" text="dark" className="mb-2 border rounded-pill px-3 py-2">
              Area Hub
            </Badge>
            <h2 className="fw-bold mb-2">{area.ward}</h2>
            <div className="text-muted">
              {area.county} • {area.constituency} • {area.station?.name || 'Selected station'}
            </div>
          </div>
          <Badge bg="primary" className="rounded-pill px-3 py-2">{area.station?.code || area.station?.stationCode}</Badge>
        </div>
      </Card.Body>
    </Card>
  );
}