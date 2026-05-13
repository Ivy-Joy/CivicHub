import React, { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { clearAuth, setGuestMode } from '../../utils/storage';

export default function GuestRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    clearAuth();
    setGuestMode(true);
  }, []);

  return (
    <AuthLayout
      eyebrow="Browse first"
      title="Continue as a guest."
      subtitle="You can explore CivicHub without creating an account. Save and personalize later when ready."
      footer={<div className="small text-muted">Guest mode is for browsing only.</div>}
    >
      <Card className="border-0 shadow-sm" style={{ borderRadius: 22 }}>
        <Card.Body className="p-4">
          <h5 className="fw-bold mb-3">What guest mode can do</h5>
          <ul className="text-muted mb-4">
            <li>Locate stations</li>
            <li>Read civic education content</li>
            <li>See public leader information</li>
            <li>View basic accountability pages</li>
          </ul>
          <div className="d-grid gap-2">
            <Button onClick={() => navigate('/')}>Enter CivicHub as guest</Button>
            <Button variant="outline-primary" onClick={() => navigate('/auth/signup')}>
              Create account instead
            </Button>
          </div>
        </Card.Body>
      </Card>
    </AuthLayout>
  );
}