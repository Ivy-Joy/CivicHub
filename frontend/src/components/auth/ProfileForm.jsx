import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function ProfileForm({ form, setForm }) {
  const interests = ['Voting', 'Constitution', 'Leaders', 'Accountability', 'Petitions', 'Campaigns'];

  const toggleInterest = (value) => {
    setForm((s) => {
      const exists = s.interests.includes(value);
      return {
        ...s,
        interests: exists ? s.interests.filter((x) => x !== value) : [...s.interests, value],
      };
    });
  };

  return (
    <>
      <Row className="g-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Full name</Form.Label>
            <Form.Control
              value={form.fullName}
              onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
              placeholder="Your name"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>County</Form.Label>
            <Form.Control
              value={form.county}
              onChange={(e) => setForm((s) => ({ ...s, county: e.target.value }))}
              placeholder="County"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Constituency</Form.Label>
            <Form.Control
              value={form.constituency}
              onChange={(e) => setForm((s) => ({ ...s, constituency: e.target.value }))}
              placeholder="Constituency"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Ward</Form.Label>
            <Form.Control
              value={form.ward}
              onChange={(e) => setForm((s) => ({ ...s, ward: e.target.value }))}
              placeholder="Ward"
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="mt-4">
        <div className="fw-bold mb-2">Interests</div>
        <div className="d-flex flex-wrap gap-2">
          {interests.map((item) => (
            <Button
              key={item}
              variant={form.interests.includes(item) ? 'primary' : 'outline-primary'}
              onClick={() => toggleInterest(item)}
              className="rounded-pill"
              type="button"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}