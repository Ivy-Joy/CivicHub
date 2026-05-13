//src/components/area/ManifestoCompareCard.jsx
import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

export default function ManifestoCompareCard({ items = [], onCompareAll }) {
  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-3">
          <div>
            <div className="text-uppercase small fw-semibold text-muted">Manifesto comparison</div>
            <h5 className="fw-bold mb-0">Compare promises by theme</h5>
          </div>
          <Button variant="outline-primary" size="sm" onClick={onCompareAll}>
            Compare with others
          </Button>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {['Health', 'Roads', 'Jobs', 'Youth', 'Women', 'Water', 'Education', 'Accountability'].map((tag) => (
            <Badge key={tag} bg="light" text="dark" className="border rounded-pill px-3 py-2">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="d-grid gap-3">
          {items.map((item) => (
            <div key={item.id} className="p-3 bg-light rounded-4">
              <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                <div>
                  <div className="fw-semibold">{item.office}</div>
                  <div className="small text-muted">{item.highlight || 'No manifesto highlight available.'}</div>
                </div>
                <Badge bg="primary" className="rounded-pill">{item.theme || 'General'}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}