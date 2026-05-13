//src/components/leader/CompareButton.jsx
import React from 'react';
import { Button } from 'react-bootstrap';

export default function CompareButton({ onClick }) {
  return (
    <Button variant="outline-primary" onClick={onClick}>
      Compare with others
    </Button>
  );
}