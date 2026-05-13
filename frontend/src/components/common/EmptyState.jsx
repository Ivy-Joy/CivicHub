//src/components/common/EmptyState.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

export default function EmptyState({ title, description, action }) {
  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: 20 }}>
      <Card.Body className="p-4 p-md-5 text-center">
        <h4 className="fw-bold mb-2">{title}</h4>
        <p className="text-muted mb-4" style={{ maxWidth: 520, margin: '0 auto' }}>
          {description}
        </p>
        {action ? action : null}
      </Card.Body>
    </Card>
  );
}