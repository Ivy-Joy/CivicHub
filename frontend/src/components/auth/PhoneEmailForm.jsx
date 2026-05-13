//frontend/src/components/auth/PhoneEmailForm.jsx
import React from 'react';
import { Form, InputGroup, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Envelope, Telephone } from 'react-bootstrap-icons';

export default function PhoneEmailForm({ form, setForm }) {
  return (
    <div className="d-grid gap-3">
      <Form.Group>
        <Form.Label>Register with</Form.Label>
        <ButtonGroup className="w-100">
          <ToggleButton
            id="register-email"
            type="radio"
            variant={form.method === 'email' ? 'primary' : 'outline-primary'}
            name="register-method"
            value="email"
            checked={form.method === 'email'}
            onChange={() => setForm((s) => ({ ...s, method: 'email' }))}
          >
            Email
          </ToggleButton>

          <ToggleButton
            id="register-phone"
            type="radio"
            variant={form.method === 'phone' ? 'primary' : 'outline-primary'}
            name="register-method"
            value="phone"
            checked={form.method === 'phone'}
            onChange={() => setForm((s) => ({ ...s, method: 'phone' }))}
          >
            Phone
          </ToggleButton>
        </ButtonGroup>
      </Form.Group>

      {form.method === 'email' ? (
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <InputGroup>
            <InputGroup.Text><Envelope /></InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            />
          </InputGroup>
        </Form.Group>
      ) : (
        <Form.Group>
          <Form.Label>Phone number</Form.Label>
          <InputGroup>
            <InputGroup.Text><Telephone /></InputGroup.Text>
            <Form.Control
              type="tel"
              placeholder="0712 345 678"
              value={form.phone}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
            />
          </InputGroup>
        </Form.Group>
      )}

      <Form.Check
        type="checkbox"
        label="I agree to the terms and privacy policy"
        checked={form.acceptedTerms}
        onChange={(e) => setForm((s) => ({ ...s, acceptedTerms: e.target.checked }))}
      />
    </div>
  );
}