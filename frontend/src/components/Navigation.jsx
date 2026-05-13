// frontend/src/components/Navigation.jsx
import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import CivichubLogo from '../assets/CivichubLogo.png';

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img
            src={CivichubLogo}
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="CivicHub Logo"
          />
          <span className="fw-bold fs-5" style={{ color: 'var(--color-black)' }}>
            CivicHub
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/" className="mx-2 fw-medium">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/locate" className="mx-2 fw-medium">Locate Station</Nav.Link>
            <Nav.Link as={NavLink} to="/read" className="mx-2 fw-medium">Read Constitution</Nav.Link>
            <Nav.Link as={NavLink} to="/dates" className="mx-2 fw-medium">Election Dates</Nav.Link>
            <Nav.Link as={NavLink} to="/whorepresents" className="mx-2 fw-medium">Who Represents Me?</Nav.Link>
            {/* <Nav.Link as={NavLink} to="/accountability" className="mx-2 fw-medium">Accountability Hub</Nav.Link> */}
          </Nav>

          <Nav className="d-flex align-items-center">
            <span className="me-3 text-muted">EN/SW</span>
            <Button
              onClick={() => navigate('/get-started')}
              style={{ backgroundColor: 'var(--color-red)', borderColor: 'var(--color-red)' }}
              className="fw-bold px-4"
            >
              Get Started
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}