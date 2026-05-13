//src/components/area/AreaSnapshotCard.jsx
import React from 'react';
import { Card, Badge } from 'react-bootstrap';

export default function AreaSnapshotCard({ area }) {
  if (!area) return null;

  return (
    <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
          <div>
            <div className="text-uppercase small fw-semibold text-muted mb-1">Selected area snapshot</div>
            <h5 className="fw-bold mb-2">{area.station?.name || area.ward}</h5>
            <div className="text-muted small">{area.county} • {area.constituency} • {area.ward}</div>
          </div>
          <Badge bg={area.station?.isOpen ? 'success' : 'secondary'} className="rounded-pill px-3 py-2">
            {area.station?.isOpen ? 'Open' : 'Closed'}
          </Badge>
        </div>

        <div className="row g-3 mt-3">
          <div className="col-md-3 col-6">
            <div className="p-3 bg-light rounded-4 text-center">
              <div className="fw-bold fs-5">{area.metrics?.leadersCount ?? '—'}</div>
              <div className="small text-muted">Leaders</div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-3 bg-light rounded-4 text-center">
              <div className="fw-bold fs-5">{area.metrics?.manifestosCount ?? '—'}</div>
              <div className="small text-muted">Manifestos</div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-3 bg-light rounded-4 text-center">
              <div className="fw-bold fs-5">{area.metrics?.reportsCount ?? '—'}</div>
              <div className="small text-muted">Reports</div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-3 bg-light rounded-4 text-center">
              <div className="fw-bold fs-5">{area.metrics?.petitionsCount ?? '—'}</div>
              <div className="small text-muted">Petitions</div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}