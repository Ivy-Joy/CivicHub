import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { civicHubApi } from '../../../services/civicHubApi';

export default function PetitionCard() {
  const [form, setForm] = useState({ title: '', description: '', targetOffice: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const data = await civicHubApi.createPetition(form);
      setMessage(data?.message || 'Petition submitted');
      setForm({ title: '', description: '', targetOffice: '' });
    } catch (err) {
      setMessage(err.message || 'Unable to submit petition');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4 p-md-5">
        <h5 className="fw-bold mb-3">Start a petition</h5>
        <Form onSubmit={submit} className="d-grid gap-3">
          <Form.Control placeholder="Petition title" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} />
          <Form.Control placeholder="Target office or leader" value={form.targetOffice} onChange={(e) => setForm((s) => ({ ...s, targetOffice: e.target.value }))} />
          <Form.Control as="textarea" rows={5} placeholder="What do you want changed?" value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} />
          <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit petition'}</Button>
        </Form>
        {message ? <div className="small text-muted mt-3">{message}</div> : null}
      </Card.Body>
    </Card>
  );
}