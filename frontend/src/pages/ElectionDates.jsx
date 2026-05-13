//frontend/src/pages/ElectionDates.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Modal, InputGroup } from 'react-bootstrap';
import { CalendarEvent, Bell, Clock, Share } from 'react-bootstrap-icons';

// Mock Data
const ELECTION_EVENTS = [
  {
    id: 1,
    title: "Continuous Voter Registration (CVR)",
    date: "Ongoing - July 2027",
    description: "Registration is open at all IEBC constituency offices. Ensure your biometrics are captured.",
    status: "active", 
    type: "Registration"
  },
  {
    id: 2,
    title: "Voter Register Inspection",
    date: "As Announced by IEBC",
    description:
      "Registered voters are given an opportunity to inspect and confirm their details in the voters’ register and request corrections where necessary.",
    status: "ongoing",
    type: "Verification"
  },
  {
    id: 3,
    title: "Understanding Your Constitutional Rights",
    date: "Always Available",
    description:
      "The Constitution guarantees every citizen the right to vote, access information, and participate in public affairs. Learn what these rights mean in practice.",
    status: "active",
    type: "Constitution"
  },
  {
    id: 4,
    title: "Public Participation on the Finance Bill",
    date: "During Parliamentary Consideration",
    description:
      "Citizens have a constitutional right to participate in public discussions on proposed Finance Bills through submissions, forums, and civic channels.",
    status: "upcoming",
    type: "Public Participation"
  }
];

export default function ElectionDates() {
  const [showModal, setShowModal] = useState(false);

  // Defined styles passed and used
  const styles = {
    brandRed: 'var(--color-red, #dc3545)', 
    brandBlack: 'var(--color-black, #000)',
    bgLight: '#f8f9fa',
    textMuted: '#6c757d'
  };

  const handleReminder = () => setShowModal(true);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>

      {/* Hero Section */}
      <div className="py-5 text-white" style={{ background: `linear-gradient(135deg, ${styles.brandBlack} 0%, #333 100%)` }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <Badge bg="danger" className="mb-3 px-3 py-2">General Election 2027</Badge>
              <h1 className="display-4 fw-bold mb-3">Every Date Matters.</h1>
              <p className="lead text-white-50 mb-4">
                Don't get left behind. Track key IEBC timelines, registration windows, and campaign periods in one place.
              </p>
              <Button 
                variant="outline-light" 
                size="lg" 
                className="rounded-pill px-4"
                onClick={handleReminder}
              >
                <Bell className="me-2" /> Get SMS Reminders
              </Button>
            </Col>
            <Col lg={5} className="mt-4 mt-lg-0">
              <Card className="bg-white text-dark border-0 shadow-lg rounded-4 p-4 text-center">
                <Card.Body>
                  <h6 className="text-uppercase fw-bold small ls-1" style={{ color: styles.textMuted }}>Next Major Milestone</h6>
                  {/* Using brandBlack style here */}
                  <h3 className="fw-bold my-3" style={{ color: styles.brandBlack }}>Voter Verification</h3>
                  <div className="d-flex justify-content-center gap-3 my-4">
                    <TimeBox value="126" label="Days" />
                    <TimeBox value="08" label="Hours" />
                    <TimeBox value="45" label="Mins" />
                  </div>
                  <div className="d-grid">
                    <Button style={{ backgroundColor: styles.brandRed, borderColor: styles.brandRed }} className="fw-bold py-2 rounded-3">
                      Add to Calendar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Timeline Section */}
      <Container className="py-5">
        <Row className="justify-content-center mb-5">
          <Col md={8} className="text-center">
            <h2 className="fw-bold mb-3" style={{ color: styles.brandBlack }}>Official Election Cycle</h2>
            <p className="text-muted">Verified dates sourced from the Independent Electoral and Boundaries Commission (IEBC).</p>
          </Col>
        </Row>

        <Row>
          <Col lg={10} className="mx-auto">
            <div className="timeline-wrapper">
              {ELECTION_EVENTS.map((event) => (
                <TimelineCard key={event.id} event={event} styles={styles} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Subscription CTA */}
      <Container fluid className="py-5 mt-5" style={{ backgroundColor: styles.bgLight }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} className="text-center">
              <Bell size={40} className="mb-3" style={{ color: styles.brandRed }} />
              <h3 className="fw-bold mb-3" style={{ color: styles.brandBlack }}>Never Miss a Deadline</h3>
              <p className="text-muted mb-4">
                Receive free SMS alerts for voter registration deadlines and polling station opening times. We respect your privacy.
              </p>
              <InputGroup className="mb-3 shadow-sm rounded-3 overflow-hidden">
                <Form.Control
                  placeholder="Enter your phone number (e.g., 0712...)"
                  aria-label="Phone number"
                  className="py-3 border-0"
                />
                <Button style={{ backgroundColor: styles.brandRed, borderColor: styles.brandRed }} className="px-4 fw-bold">
                  Subscribe
                </Button>
              </InputGroup>
              <small className="text-muted">No spam. Only official IEBC updates.</small>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Reminder Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold" style={{ color: styles.brandBlack }}>Set Custom Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select which updates you want to receive:</p>
          <Form>
            <Form.Check type="checkbox" label="Voter Registration Alerts" defaultChecked className="mb-2" />
            <Form.Check type="checkbox" label="Polling Station Changes" defaultChecked className="mb-2" />
            <Form.Check type="checkbox" label="Candidate Announcement" className="mb-2" />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button style={{ backgroundColor: styles.brandRed, borderColor: styles.brandRed }} onClick={() => setShowModal(false)}>Save Preferences</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// --- Sub-Components ---

const TimeBox = ({ value, label }) => (
  <div className="text-center">
    <div className="bg-light rounded-3 d-flex align-items-center justify-content-center border" style={{ width: '60px', height: '60px' }}>
      <span className="fw-bold fs-4 text-dark">{value}</span>
    </div>
    <small className="text-muted mt-1 d-block" style={{ fontSize: '0.75rem' }}>{label}</small>
  </div>
);

// styles for specific color accents
const TimelineCard = ({ event, styles }) => {
  
  // Status Logic
  let badgeBg = 'secondary';
  let badgeText = 'Pending';
  let borderClass = 'border-start border-4';
  let borderColor = 'border-secondary';

  if (event.status === 'active') {
    badgeBg = 'success';
    badgeText = 'Happening Now';
    borderColor = 'border-success';
  } else if (event.status === 'upcoming') {
    badgeBg = 'primary';
    badgeText = 'Upcoming';
    borderColor = 'border-primary';
  }

  return (
    <Card className={`mb-4 border-0 shadow-sm rounded-4 overflow-hidden ${borderClass} ${borderColor}`}>
      <Card.Body className="p-4">
        <Row className="align-items-center">
          <Col md={3} className="text-md-center border-end-md mb-3 mb-md-0">
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <CalendarEvent size={24} className="mb-2 text-muted" />
                {/* Use styles.brandBlack for date to ensure contrast */}
                <span className="fw-bold" style={{ color: styles.brandBlack }}>{event.date}</span>
                <Badge bg={badgeBg} pill className="mt-2 px-3">{badgeText}</Badge>
            </div>
          </Col>
          <Col md={7}>
            <div className="d-flex align-items-center mb-2">
                <span className="text-uppercase small text-muted fw-bold me-2">{event.type}</span>
            </div>
            {/* Use styles.brandBlack for title */}
            <h4 className="fw-bold mb-2" style={{ color: styles.brandBlack }}>{event.title}</h4>
            <p className="text-muted mb-0">{event.description}</p>
          </Col>
          <Col md={2} className="text-end mt-3 mt-md-0">
             <Button variant="light" className="rounded-circle p-2 border" title="Add to Calendar">
                <Clock size={18} />
             </Button>
             <div className="mt-2 d-none d-md-block"></div>
             <Button variant="light" className="rounded-circle p-2 border ms-2 ms-md-0" title="Share">
                <Share size={18} />
             </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};