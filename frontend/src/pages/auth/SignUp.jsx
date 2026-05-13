import React, { useMemo, useState } from 'react';
import { Alert, Badge, Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import PhoneEmailForm from '../../components/auth/PhoneEmailForm';
import { authService } from '../../services/authService';

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefill = location.state?.identifier || '';
  const prefillMethod = location.state?.method || (prefill.includes('@') ? 'email' : prefill ? 'phone' : 'phone');

  const [form, setForm] = useState({
    method: prefillMethod,
    email: prefillMethod === 'email' ? prefill : '',
    phone: prefillMethod === 'phone' ? prefill : '',
    acceptedTerms: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = useMemo(() => {
    if (!form.acceptedTerms) return false;
    if (form.method === 'email') return Boolean(form.email.trim());
    return Boolean(form.phone.trim());
  }, [form.acceptedTerms, form.method, form.email, form.phone]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload =
        form.method === 'email'
          ? {
              email: form.email.trim(),
              acceptedTerms: form.acceptedTerms,
            }
          : {
              phone: form.phone.trim(),
              acceptedTerms: form.acceptedTerms,
            };

      const data = await authService.register(payload);
      const contact = form.method === 'email' ? form.email.trim() : form.phone.trim();

      navigate('/auth/verify', {
        state: {
          identifier: contact,
          method: form.method,
          userId: data?.data?.userId,
        },
      });
    } catch (err) {
      setError(err.message || 'Unable to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Create your CivicHub account"
      title="One contact, one secure start."
      subtitle="Choose either phone or email. We will send a verification code, then you create a password and complete your profile."
      footer={<div className="small text-muted">Already have an account? <Link to="/auth/signin">Sign in</Link></div>}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Sign up</h2>
        <Badge bg="info" className="rounded-pill px-3 py-2">Step 1 of 3</Badge>
      </div>

      {error ? <Alert variant="danger">{error}</Alert> : null}

      <Form onSubmit={onSubmit} className="d-grid gap-3">
        <PhoneEmailForm form={form} setForm={setForm} />

        <Button type="submit" size="lg" disabled={!canSubmit || loading}>
          {loading ? 'Creating account...' : 'Continue'}
        </Button>
      </Form>
    </AuthLayout>
  );
}