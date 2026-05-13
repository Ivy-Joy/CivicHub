//src/components/area/ParticipationPanel.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function ParticipationPanel({ onCreatePetition, onOpenConsultation, onOpenPoll, onMessageLeader }) {
  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4">
        <div className="text-uppercase small fw-semibold text-muted mb-1">Participate</div>
        <h5 className="fw-bold mb-3">Join public participation</h5>

        <div className="d-grid gap-2">
          <Button onClick={onCreatePetition}>Start a petition</Button>
          <Button variant="outline-primary" onClick={onOpenConsultation}>Public consultation</Button>
          <Button variant="outline-primary" onClick={onOpenPoll}>Opinion poll</Button>
          <Button variant="outline-dark" onClick={onMessageLeader}>Message a leader</Button>
        </div>
      </Card.Body>
    </Card>
  );
}