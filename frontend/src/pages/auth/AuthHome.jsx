//frontend/src/pages/auth/AuthHome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { BoxArrowInRight, PersonCheck, PersonPlus, FileEarmarkPerson, GeoAltFill, Check2Circle, Stars, ShieldLock } from 'react-bootstrap-icons';
import AuthLayout from '../../components/auth/AuthLayout';
import { clearAuth, setGuestMode } from '../../utils/storage';

export default function AuthHome() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      eyebrow="Get started in seconds"
      title="Choose how you want to enter CivicHub."
      subtitle="Create your account, sign in, or continue as a guest to explore stations, civic education, leaders, and accountability tools."
      footer={<div className="small text-muted">By continuing, you agree to CivicHub’s terms and privacy rules.</div>}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <div className="text-uppercase small fw-semibold text-muted">Account access</div>
          <h2 className="fw-bold mb-0">Start here</h2>
        </div>
        <Badge bg="success" className="rounded-pill px-3 py-2">Secure</Badge>
      </div>

      <Row className="g-3">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 22 }}>
            <Card.Body className="p-4 d-flex flex-column">
              <PersonPlus size={28} className="mb-3" />
              <h5 className="fw-bold">Create account</h5>
              <p className="text-muted small flex-grow-1">
                Register with phone or email, verify, then finish your profile later.
              </p>
              <Button className="w-100" onClick={() => navigate('/auth/signup')}>
                Sign up
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 22 }}>
            <Card.Body className="p-4 d-flex flex-column">
              <BoxArrowInRight size={28} className="mb-3" />
              <h5 className="fw-bold">Sign in</h5>
              <p className="text-muted small flex-grow-1">
                Return to your dashboard, saved places, alerts, and community activity.
              </p>
              <Button variant="outline-primary" className="w-100" onClick={() => navigate('/auth/signin')}>
                Sign in
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 22 }}>
            <Card.Body className="p-4 d-flex flex-column">
              <PersonCheck size={28} className="mb-3" />
              <h5 className="fw-bold">Continue as guest</h5>
              <p className="text-muted small flex-grow-1">
                Explore without creating an account. You can register later when ready.
              </p>
              <Button
                variant="dark"
                className="w-100"
                onClick={() => {
                  clearAuth();
                  setGuestMode(true);
                  navigate('/');
                }}
              >
                Continue
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-4 p-4 rounded-4" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef3ff 100%)' }}>
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <div className="rounded-circle bg-white shadow-sm d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
            <FileEarmarkPerson size={22} />
          </div>
          <div className="flex-grow-1">
            <div className="fw-bold">What happens after sign-up?</div>
            <div className="text-muted small">
              You will verify with OTP, set a password, then complete your profile with county and civic preferences.
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}