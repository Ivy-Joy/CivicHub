import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { civicApi } from '../../../services/civicApi';

export default function ReportFormCard() {
  const [form, setForm] = useState({ category: '', subject: '', description: '' });
  const [status, setStatus] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await civicApi.submitCorruptionReport(form);
      setStatus(data?.message || 'Report submitted');
      setForm({ category: '', subject: '', description: '' });
    } catch (err) {
      setStatus(err.message || 'Unable to submit report');
    }
  };

  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4 p-md-5">
        <h5 className="fw-bold mb-3">Report corruption or misconduct</h5>
        <p className="text-muted small">
          Anonymous reporting can be supported by your backend. Keep sensitive data minimal.
        </p>
        {status ? <Alert variant="info">{status}</Alert> : null}
        <Form onSubmit={submit} className="d-grid gap-3">
          <Form.Select value={form.category} onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}>
            <option value="">Select category</option>
            <option value="Procurement">Procurement</option>
            <option value="Bribery">Bribery</option>
            <option value="Misuse of funds">Misuse of funds</option>
            <option value="Ghost project">Ghost project</option>
          </Form.Select>
          <Form.Control placeholder="Subject" value={form.subject} onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))} />
          <Form.Control as="textarea" rows={5} placeholder="Describe what happened" value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} />
          <Button type="submit">Submit report</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}