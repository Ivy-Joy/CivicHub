import React from 'react';
import { Form, ProgressBar } from 'react-bootstrap';

export default function PasswordForm({ form, setForm, strength }) {
  return (
    <div className="d-grid gap-3">
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
        />
      </Form.Group>

      <ProgressBar now={(strength / 5) * 100} label={strength ? 'Password strength' : ' '} />

      <Form.Group>
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Repeat password"
          value={form.confirm}
          onChange={(e) => setForm((s) => ({ ...s, confirm: e.target.value }))}
        />
      </Form.Group>
    </div>
  );
}