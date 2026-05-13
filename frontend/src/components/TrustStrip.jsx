// frontend/src/components/TrustStrip.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ShieldLock, WifiOff, Phone } from 'react-bootstrap-icons';

export default function TrustStrip() {
  return (
    <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <Card.Body className="p-4 text-center">
                <WifiOff size={30} className="mb-3" />
                <h5 className="fw-bold">Offline-friendly</h5>
                <p className="text-muted mb-0">
                  Built to stay useful on mobile, low-bandwidth, and shared-device workflows.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <Card.Body className="p-4 text-center">
                <ShieldLock size={30} className="mb-3" />
                <h5 className="fw-bold">Privacy-first</h5>
                <p className="text-muted mb-0">
                  We do not collect sensitive information.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 20 }}>
              <Card.Body className="p-4 text-center">
                <Phone size={30} className="mb-3" />
                <h5 className="fw-bold">Ready for profiles</h5>
                <p className="text-muted mb-0">
                  You access the system information through sign-in, guest mode, or profile creation.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}