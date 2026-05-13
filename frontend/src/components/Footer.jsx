//components/Footer.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CivichubLogo from '../assets/CivichubLogo.png'; 

const Footer = () => {
  return (
    <footer 
      className="text-white pt-5 pb-3" 
      style={{ backgroundColor: 'var(--color-black)' }}
    >
      <div style={{ height: '5px', background: 'linear-gradient(to right, var(--color-black) 25%, var(--color-red) 25%, var(--color-red) 50%, var(--color-green) 50%, var(--color-green) 75%, var(--color-white) 75%)' }}></div>
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-2">
              <img src={CivichubLogo} width="24" height="24" alt="Civic Hub Logo" className="me-2" />
              <span className="fw-bold fs-5">CivicHub</span>
            </div>
            <p className="small">Harambee: Pulling together for an informed nation. <br/>Stronger civic accountability and guarantee.</p>
          </Col>
          <Col xs={6} md={2}>
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled small">
              <li><a href="#home" className="text-decoration-none">Home</a></li>
              <li><a href="#locate" className="text-decoration-none">Locate Station</a></li>
              <li><a href="#read" className="text-decoration-none">Read Constitution</a></li>
              <li><a href="#dates" className="text-decoration-none">Election Dates</a></li>
            </ul>
          </Col>
          <Col xs={6} md={3}>
            <h5 className="fw-bold mb-3">Partners</h5>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-decoration-none">Katiba Institute</a></li>
              <li><a href="#" className="text-decoration-none">Siasa Place</a></li>
              <li><a href="#" className="text-decoration-none">Civic Rise</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="fw-bold mb-3">Project Timeline</h5>
            <p className="text-white small fw-medium">
                **MVP Launch: In 3 Months**
            </p>
            <Button size="sm" variant="outline-light">Get Updates</Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center small">
            <hr style={{ borderColor: 'red' }}/>
            Copyright &copy; 2024 CivicHub. All Rights Reserved. Built with Pride in Kenya.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;