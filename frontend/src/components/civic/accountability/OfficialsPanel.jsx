import React from 'react';
import { Card } from 'react-bootstrap';

export default function OfficialsPanel({ officials = [] }) {
  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4">
        <h5 className="fw-bold mb-3">Officials and follow-up</h5>
        <div className="d-grid gap-3">
          {officials.map((item) => (
            <div key={item._id || item.id} className="p-3 bg-light rounded-4">
              <div className="fw-semibold">{item.name}</div>
              <div className="small text-muted">{item.office} • {item.status}</div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}