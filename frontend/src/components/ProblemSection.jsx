//components/ProblemSection.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//import { Map, Lightning Fill } from 'react-bootstrap-icons'; // Example icon imports
// Placeholder for the stylized Kenya map graphic
import KenyaMapGraphic from '../assets/kenya-map-graphic.png'; 

const ProblemSection = () => {
  return (
    <section id="problem" className="py-5 py-md-5 bg-light">
      <Container>
        <Row className="align-items-center">
          <Col md={7}>
            <h2 className="display-6 fw-bold mb-4">Bridging the Information Gap.</h2>
            <p className="lead text-muted">
              CivicHub is Kenya's non-partisan platform to replace fragmented data, 
              difficult-to-interpret websites, and unreliable social media with one 
              reliable, location-based hub. We empower citizens to act (register, vote, learn) 
              with confidence.
            </p>
          </Col>
          <Col md={5} className="text-center mt-4 mt-md-0">
            {/* Placeholder for the stylized digital Kenya map */}
            <img src={KenyaMapGraphic} alt="Stylized Digital Kenya Map" style={{ maxWidth: '300px', height: 'auto' }} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProblemSection;