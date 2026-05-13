import React from 'react';
import { Form } from 'react-bootstrap';

export default function OtpInput({ value, onChange, label = 'One-time code' }) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        inputMode="numeric"
        placeholder="6-digit code"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={6}
      />
    </Form.Group>
  );
}