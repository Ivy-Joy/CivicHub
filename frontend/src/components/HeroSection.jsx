// frontend/src/components/HeroSection.jsx
import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../assets/hero-family.png';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(8, 18, 34, 0.76), rgba(8, 18, 34, 0.76)), url(${HeroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '92vh',
      }}
    >
      <Container className="py-5" style={{ minHeight: '92vh' }}>
        <Row className="align-items-center" style={{ minHeight: '92vh' }}>
          <Col lg={7} className="py-4">
            <Badge bg="light" text="dark" className="mb-3 px-3 py-2 rounded-pill fw-semibold">
              CivicHub • Kenya’s civic platform
            </Badge>

            <h1 className="display-3 fw-bolder mb-3">
              Your Voice. Your Vote.
              <br />
              Your Constitution.
            </h1>

            <p className="lead mb-4 fw-light" style={{ maxWidth: 640 }}>
              Find your station, understand your rights, see who represents you, and track accountability
              in one clean, trusted civic experience.
            </p>

            <div className="d-flex flex-column flex-md-row gap-3 mt-4">
              <Button
                size="lg"
                onClick={() => navigate('/get-started')}
                style={{ backgroundColor: 'var(--color-red)', borderColor: 'var(--color-red)' }}
                className="fw-bold px-4"
              >
                Get Started
              </Button>

              <Button
                size="lg"
                variant="outline-light"
                onClick={() => navigate('/auth/signin')}
                className="fw-bold px-4"
              >
                Sign In
              </Button>

              <Button
                size="lg"
                variant="light"
                onClick={() => navigate('/guest')}
                className="fw-bold px-4"
              >
                Continue as Guest
              </Button>
            </div>

            <div className="mt-4 small text-white-50">
              Privacy-first. Informational only. No National ID collection on the landing page.
            </div>
          </Col>

          <Col lg={5} className="py-4">
            <Card
              className="border-0 shadow-lg bg-white text-dark"
              style={{ borderRadius: 24 }}
            >
              <Card.Body className="p-4 p-md-5">
                <div className="text-uppercase small fw-semibold text-muted mb-2">
                  Start your journey
                </div>
                <h2 className="fw-bold mb-4">Choose one path</h2>

                <div className="d-grid gap-3">
                  <Button variant="primary" size="lg" onClick={() => navigate('/locate')}>
                    Find My Station
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={() => navigate('/read')}>
                    Learn My Rights
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={() => navigate('/whorepresents')}>
                    See My Leaders
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={() => navigate('/accountability')}>
                    Track Accountability
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}