import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function PollCard({ poll, onVote }) {
  return (
    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4">
        <div className="text-uppercase small fw-semibold text-muted mb-1">Opinion poll</div>
        <h5 className="fw-bold mb-2">{poll.title}</h5>
        <p className="text-muted small">{poll.description}</p>
        <div className="d-grid gap-2">
          {(poll.options || []).map((option) => (
            <Button key={option} variant="outline-primary" onClick={() => onVote(poll._id || poll.id, option)}>
              {option}
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}