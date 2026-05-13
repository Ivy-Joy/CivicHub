//src/components/station/SelectedStationSummary.jsx
import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { GeoAlt, Clock } from 'react-bootstrap-icons';

export default function SelectedStationSummary({ station, onDirections, onOpenAreaHub }) {
  if (!station) return null;

  return (
    <Card className="border-0 shadow-sm mt-3" style={{ borderRadius: 22 }}>
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
          <div>
            <Badge bg="light" text="dark" className="mb-2 border">
              Selected station
            </Badge>
            <h5 className="fw-bold mb-1">{station.name}</h5>
            <div className="text-muted small d-flex flex-wrap gap-3">
              <span>{station.county}</span>
              <span>{station.constituency}</span>
              <span>{station.ward}</span>
            </div>
          </div>

          <Badge bg={station.isOpen ? 'success' : 'secondary'} className="px-3 py-2 rounded-pill">
            {station.isOpen ? 'Open today' : 'Closed'}
          </Badge>
        </div>

        <div className="d-flex flex-wrap gap-4 mt-3 text-muted small">
          <span className="d-flex align-items-center gap-2"><GeoAlt /> {station.distanceLabel}</span>
          <span className="d-flex align-items-center gap-2"><Clock /> {station.openHours || '—'}</span>
        </div>

        <div className="d-flex gap-2 mt-4 flex-wrap">
          <Button onClick={onDirections}>Get Directions</Button>
          {onOpenAreaHub ? (
            <Button variant="outline-primary" onClick={onOpenAreaHub}>
              Open Area Hub
            </Button>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
}