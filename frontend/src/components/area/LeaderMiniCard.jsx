//src/components/area/LeaderMiniCard.jsx
import React from 'react';
import { Button, Card, Badge } from 'react-bootstrap';

export default function LeaderMiniCard({ leader, onOpenDetail, onCompare }) {
  return (
    <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 22 }}>
      <Card.Body className="p-4 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 flex-wrap mb-2">
          <Badge bg="secondary">{leader.office}</Badge>
          {leader.party ? <span className="small text-muted">{leader.party}</span> : null}
        </div>
        <h5 className="fw-bold mb-1">{leader.name || leader.holderName || '—'}</h5>
        <div className="small text-muted mb-3">{leader.roleSummary || leader.summary || 'Role summary not available yet.'}</div>
        <div className="d-flex gap-2 mt-auto flex-wrap">
          <Button size="sm" onClick={onOpenDetail}>View profile</Button>
          <Button size="sm" variant="outline-primary" onClick={onCompare}>Compare</Button>
        </div>
      </Card.Body>
    </Card>
  );
}