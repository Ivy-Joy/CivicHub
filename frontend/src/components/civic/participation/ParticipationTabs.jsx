import React from 'react';
import { Nav } from 'react-bootstrap';

const tabs = ['petitions', 'polls', 'consultations', 'messages'];

export default function ParticipationTabs({ active, onChange }) {
  return (
    <Nav variant="pills" className="flex-wrap gap-2 mb-4">
      {tabs.map((tab) => (
        <Nav.Item key={tab}>
          <Nav.Link
            active={active === tab}
            onClick={() => onChange(tab)}
            style={{ cursor: 'pointer' }}
            className="rounded-pill px-3"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}