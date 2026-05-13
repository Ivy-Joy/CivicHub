import React, { useState } from 'react';
import { Alert, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeSlash, PersonBadge } from 'react-bootstrap-icons';
import AuthLayout from '../../components/auth/AuthLayout';
import { authService } from '../../services/authService';
import { clearAuth, saveToken, saveUser, setGuestMode } from '../../utils/storage';

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login({
        identifier: form.identifier.trim(),
        password: form.password,
      });

      clearAuth();
      saveToken(data.accessToken);
      saveUser(data.user);
      setGuestMode(false);

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to your CivicHub dashboard."
      subtitle="Access your saved stations, civic alerts, community feedback, and accountability tools."
      footer={<div className="small text-muted">New here? <Link to="/auth/signup">Create an account</Link></div>}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Sign in</h2>
        <Badge bg="dark" className="rounded-pill px-3 py-2">Secure access</Badge>
      </div>

      {error ? <Alert variant="danger">{error}</Alert> : null}

      <Form onSubmit={onSubmit} className="d-grid gap-3">
        <Form.Group>
          <Form.Label>Email or phone</Form.Label>
          <InputGroup>
            <InputGroup.Text><PersonBadge /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Email or phone"
              value={form.identifier}
              onChange={(e) => setForm((s) => ({ ...s, identifier: e.target.value }))}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
            />
            <Button variant="outline-secondary" onClick={() => setShowPassword((s) => !s)} type="button">
              {showPassword ? <EyeSlash /> : <Eye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <Link to="/auth/forgot-password" className="small text-decoration-none">Forgot password?</Link>
          <Link to="/auth/guest" className="small text-decoration-none">Continue as guest</Link>
        </div>

        <Button type="submit" size="lg" disabled={loading || !form.identifier.trim() || !form.password}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </Form>
    </AuthLayout>
  );
}