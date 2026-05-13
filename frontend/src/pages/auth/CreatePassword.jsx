import React, { useMemo, useState } from 'react';
import { Alert, Badge, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import PasswordForm from '../../components/auth/PasswordForm';
import { authService } from '../../services/authService';

export default function CreatePassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    password: '',
    confirm: '',
    userId: location.state?.userId || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const strength = useMemo(() => {
    const p = form.password;
    let score = 0;
    if (p.length >= 8) score += 1;
    if (/[A-Z]/.test(p)) score += 1;
    if (/[a-z]/.test(p)) score += 1;
    if (/[0-9]/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;
    return score;
  }, [form.password]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await authService.createPassword({
        userId: form.userId,
        password: form.password,
      });

      navigate('/auth/profile', { state: { userId: form.userId } });
    } catch (err) {
      setError(err.message || 'Unable to set password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Set your secure password"
      title="Choose a password you will remember."
      subtitle="After this, you can complete your profile and begin using CivicHub fully."
      footer={<div className="small text-muted">Step 3 of 3 before profile completion.</div>}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Create password</h2>
        <Badge bg="success" className="rounded-pill px-3 py-2">Step 3 of 3</Badge>
      </div>

      {error ? <Alert variant="danger">{error}</Alert> : null}

      <form onSubmit={onSubmit} className="d-grid gap-3">
        <PasswordForm form={form} setForm={setForm} strength={strength} />

        <Button type="submit" size="lg" disabled={loading || !form.password || !form.confirm}>
          {loading ? 'Saving...' : 'Save password'}
        </Button>
      </form>
    </AuthLayout>
  );
}