//src/components/common/ErrorState.jsx
import React from 'react';
import { Alert, Button } from 'react-bootstrap';

export default function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <Alert variant="danger" className="border-0 shadow-sm">
      <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
        <div>
          <div className="fw-bold">{title}</div>
          <div className="small">{message}</div>
        </div>
        {onRetry ? (
          <Button size="sm" variant="outline-danger" onClick={onRetry}>
            Retry
          </Button>
        ) : null}
      </div>
    </Alert>
  );
}