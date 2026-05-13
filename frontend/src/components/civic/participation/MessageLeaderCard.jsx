import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { civicHubApi } from '../../../services/civicHubApi';

export default function MessageLeaderCard({ leaders = [] }) {
  const [form, setForm] = useState({ leaderId: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await civicHubApi.messageLeader(form);
      setStatus(data?.message || 'Message sent');
      setForm({ leaderId: '', subject: '', message: '' });
    } catch (err) {
      setStatus(err.message || 'Unable to send message');
    }
  };

  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4 p-md-5">
        <h5 className="fw-bold mb-3">Message a leader</h5>
        <Form onSubmit={submit} className="d-grid gap-3">
          <Form.Select value={form.leaderId} onChange={(e) => setForm((s) => ({ ...s, leaderId: e.target.value }))}>
            <option value="">Select leader</option>
            {leaders.map((leader) => (
              <option key={leader._id || leader.id} value={leader._id || leader.id}>
                {leader.office} — {leader.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control placeholder="Subject" value={form.subject} onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))} />
          <Form.Control as="textarea" rows={5} placeholder="Write your message" value={form.message} onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))} />
          <Button type="submit">Send message</Button>
        </Form>
        {status ? <div className="small text-muted mt-3">{status}</div> : null}
      </Card.Body>
    </Card>
  );
}