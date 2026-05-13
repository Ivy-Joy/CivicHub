//components/TrustAndTech.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { WifiOff, ShieldLock, CodeSlash, CheckCircleFill } from 'react-bootstrap-icons';

const TrustAndTech = () => {
  const assurances = [
    { icon: WifiOff, title: 'Offline-first', desc: 'CivicHub is designed to make essential civic information available anytime and anywhere. The platform prioritizes digital access while remaining inclusive of users with limited connectivity through mobile-friendly design, SMS/USSD support, and printable resources for offline use.' },
    { icon: ShieldLock, title: 'Privacy Shield', desc: 'CivicHub does not track political preferences, voting choices, or personal identity beyond what is strictly necessary for service delivery. User data is protected through minimal data collection, secure storage practices, and clear consent mechanisms to ensure trust, safety, and confidentiality for all citizens.' },
    { icon: CodeSlash, title: 'Tech Stack', desc: 'CivicHub is built using modern, reliable, and open-source technologies to ensure performance, scalability, and long-term sustainability. The platform uses a React-based frontend for accessibility and responsiveness, a Node.js backend for secure API services, and MongoDB for flexible data management.' }
  ];

  const targets = [
    'All Citizens',
    'First-Time and Young Voters',
    'Rural and Low-Connectivity Communities',
    'Teachers and Students',
    'Community Champions and Civic Leaders'
  ];

  return (
    <section id="trust" className="py-5 py-md-5">
      <Container>
        <h2 className="text-center display-6 fw-bold mb-5">Built for Kenya. Built for Privacy.</h2>
        
        <Row className="justify-content-center g-4 mb-5">
          {assurances.map((item, index) => (
            <Col key={index} md={4}>
              <Card className="text-center p-3 h-100 border-0 shadow-sm">
                <div className="mx-auto mb-3" style={{ color: 'var(--color-red)' }}>
                  {React.createElement(item.icon, { size: 30 })}
                </div>
                <Card.Title className="fw-bold">{item.title}</Card.Title>
                <Card.Text className="small text-muted">{item.desc}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>

        <h3 className="text-center fw-bold mb-4">Who is CivicHub For?</h3>
        <Row className="justify-content-center">
          <Col md={8}>
            <Row className="g-3">
              {targets.map((target, index) => (
                <Col key={index} sm={6}>
                  <p className="mb-1 fw-medium">
                    <CheckCircleFill style={{ color: 'var(--color-green)' }} className="me-2" />
                    {target}
                  </p>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TrustAndTech;