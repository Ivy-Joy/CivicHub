//src/components/station/LocationButton.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { GeoAltFill } from 'react-bootstrap-icons';

export default function LocationButton({ loading, onClick }) {
  return (
    <Button
      variant="light"
      className="w-100 d-flex align-items-center justify-content-center gap-2 py-3 shadow-sm border"
      onClick={onClick}
      disabled={loading}
    >
      <GeoAltFill />
      {loading ? 'Detecting location...' : 'Use My Current Location'}
    </Button>
  );
}