//components/FeaturesGrid.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { GeoAltFill, BookFill, CalendarDateFill, PeopleFill } from 'react-bootstrap-icons';

const FeaturesGrid = () => {
  const features = [
    {
      icon: GeoAltFill,
      title: 'Where to Vote',
      text: 'Find your registration/polling stations to search your voter vote.'
    },
    {
      icon: BookFill,
      title: 'Know Your Rights',
      text: 'Access the Constitution in three levels to access your Constitution.'
    },
    {
      icon: CalendarDateFill,
      title: 'Never Miss a Date',
      text: 'Track election timelines and SMS reminders, and miss your election eventcomies.'
    },
    {
      icon: PeopleFill,
      title: 'Know Your Leaders',
      text: 'View summation of officials about how you near Your Leaders.'
    }
  ];

  return (
    <section id="features" className="py-5 py-md-5">
      <Container>
        <h2 className="text-center display-6 fw-bold mb-5">Empowering You with Information</h2>
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={3}>
              <Card className="text-center border-0 p-3 shadow-sm h-100">
                <div className="mx-auto mb-3" style={{ color: index % 2 === 0 ? 'var(--color-green)' : 'var(--color-black)' }}>
                  {React.createElement(feature.icon, { size: 40 })}
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold fs-5">{feature.title}</Card.Title>
                  <Card.Text className="text-muted">{feature.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesGrid;