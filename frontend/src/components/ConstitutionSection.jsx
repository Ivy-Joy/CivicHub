//components/ConstitutionSection.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ImageKids from '../assets/constitution-kids.png';
import ImageLearners from '../assets/constitution-learners.png';
import ImageCitizen from '../assets/constitution-citizen.png';

const ConstitutionSection = () => {
  const levels = [
    { 
      title: 'Level 1: The Future', 
      subtitle: '(Kids & Primary)', 
      desc: 'Illustrated stories teaching fairness and rights.',
      image: ImageKids 
    },
    { 
      title: 'Level 2: The Learner', 
      subtitle: '(Secondary & Youth)', 
      desc: 'Visual explainers and simple summaries.',
      image: ImageLearners 
    },
    { 
      title: 'Level 3: The Citizen', 
      subtitle: '(Adults & Professionals)', 
      desc: 'Full annotated text and legal context.',
      image: ImageCitizen 
    },
  ];

  return (
    <section id="constitution" className="py-5 py-md-5" style={{ backgroundColor: '#e8f5e9' }}> 
      <Container>
        <h2 className="text-center display-6 fw-bold mb-5">A Constitution You Can Understand</h2>
        <Row className="g-4">
          {levels.map((level, index) => (
            <Col key={index} md={4}>
              <Card className="text-center h-100 shadow-sm border-0">
                <Card.Body>
                  <h3 className="fw-bolder mb-0" style={{ color: 'var(--color-green)' }}>{level.title}</h3>
                  <p className="text-muted fw-medium mb-3">{level.subtitle}</p>
                  <div className="mb-3">
                    {/* Placeholder image */}
                    <img src={level.image} alt={level.title} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}/>
                  </div>
                  <p className="small text-muted">{level.desc}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ConstitutionSection;