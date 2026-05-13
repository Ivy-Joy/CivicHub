//src/components/common/LoadingState.jsx
import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="d-flex align-items-center justify-content-center py-5 my-5 text-muted">
      <Spinner animation="border" size="sm" className="me-2" />
      <span>{label}</span>
    </div>
  );
}