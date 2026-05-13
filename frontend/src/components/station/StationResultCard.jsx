//src/components/station/StationResultCard.jsx
import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { GeoAltFill } from 'react-bootstrap-icons';

export default function StationResultCard({ station, active, onClick }) {
  return (
    <Card
      onClick={onClick}
      role="button"
      className={`border-0 shadow-sm ${active ? 'border border-primary' : ''}`}
      style={{ borderRadius: 20, cursor: 'pointer' }}
    >
      <Card.Body className="p-3 p-md-4">
        <div className="d-flex align-items-start gap-3">
          <div className="rounded-4 d-flex align-items-center justify-content-center" style={{ width: 44, height: 44, backgroundColor: 'rgba(13,110,253,0.08)' }}>
            <GeoAltFill />
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start gap-2 flex-wrap">
              <div>
                <h6 className="fw-bold mb-1">{station.name}</h6>
                <div className="small text-muted">{station.county} • {station.constituency} • {station.ward}</div>
              </div>
              <Badge bg={station.isOpen ? 'success' : 'secondary'} className="rounded-pill px-3 py-2">
                {station.isOpen ? 'Open' : 'Closed'}
              </Badge>
            </div>

            <div className="small text-muted mt-2">
              Code: {station.stationCode || station.code} • {station.distanceLabel}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}