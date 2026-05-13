// frontend/src/components/JourneySection.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
  GeoAltFill,
  BookFill,
  PeopleFill,
  ShieldCheck,
} from 'react-bootstrap-icons';

const journeys = [
  {
    icon: GeoAltFill,
    title: 'Find My Station',
    text: 'Search by place or use live location to discover the right station fast.',
    to: '/locate',
  },
  {
    icon: BookFill,
    title: 'Learn My Rights',
    text: 'Understand the Constitution, election rules, and civic responsibilities.',
    to: '/read',
  },
  {
    icon: PeopleFill,
    title: 'See My Leaders',
    text: 'Explore who represents your area and what each office actually does.',
    to: '/whorepresents',
  },
  {
    icon: ShieldCheck,
    title: 'Track Accountability',
    text: 'Follow public spending, reports, participation, and civic follow-up.',
    to: '/accountability',
  },
];

export default function JourneySection() {
  return (
    <section className="py-5 bg-white">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">One platform. Four clear civic journeys.</h2>
          <p className="text-muted mb-0 mx-auto" style={{ maxWidth: 720 }}>
            CivicHub is designed to guide users step by step instead of overwhelming them with everything at once.
          </p>
        </div>

        <Row className="g-4">
          {journeys.map((item, index) => {
            const Icon = item.icon;
            return (
              <Col key={index} md={6} xl={3}>
                <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 22 }}>
                  <Card.Body className="p-4">
                    <div
                      className="mb-3 d-inline-flex align-items-center justify-content-center rounded-4"
                      style={{
                        width: 56,
                        height: 56,
                        backgroundColor: index % 2 === 0 ? 'rgba(0, 102, 0, 0.08)' : 'rgba(220, 53, 69, 0.08)',
                      }}
                    >
                      <Icon size={28} />
                    </div>
                    <Card.Title className="fw-bold fs-4">{item.title}</Card.Title>
                    <Card.Text className="text-muted">{item.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}