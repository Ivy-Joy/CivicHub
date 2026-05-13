//frontend/src/pages/auth/VerifyOtp.jsx
import React, { useState } from 'react';
import { Alert, Badge, Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import OtpInput from '../../components/auth/OtpInput';
import { authService } from '../../services/authService';

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    identifier: location.state?.identifier || '',
    code: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.verifyOtp({
        identifier: form.identifier.trim(),
        code: form.code.trim(),
      });

      navigate('/auth/create-password', {
        state: { userId: data.userId, identifier: form.identifier.trim() },
      });
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Verify your contact"
      title="Enter the one-time code."
      subtitle="Check your phone or inbox, then continue to password setup."
      footer={<div className="small text-muted">Need another code? Use the resend action in your backend-driven flow.</div>}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Verification</h2>
        <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2">Step 2 of 3</Badge>
      </div>

      {error ? <Alert variant="danger">{error}</Alert> : null}

      <Form onSubmit={onSubmit} className="d-grid gap-3">
        <Form.Group>
          <Form.Label>Email or phone</Form.Label>
          <Form.Control
            type="text"
            value={form.identifier}
            onChange={(e) => setForm((s) => ({ ...s, identifier: e.target.value }))}
            placeholder="Email or phone used during sign up"
          />
        </Form.Group>

        <OtpInput value={form.code} onChange={(code) => setForm((s) => ({ ...s, code }))} />

        <Button type="submit" size="lg" disabled={loading || !form.identifier.trim() || !form.code.trim()}>
          {loading ? 'Verifying...' : 'Verify and continue'}
        </Button>

        <div className="text-center small text-muted">
          <Link to="/auth/signup">Go back to sign up</Link>
        </div>
      </Form>
    </AuthLayout>
  );
}