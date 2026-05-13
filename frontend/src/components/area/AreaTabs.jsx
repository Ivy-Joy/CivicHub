//src/components/area/AreaTabs.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';

export default function AreaTabs({ activeTab, onChange }) {
  const tabs = ['overview', 'leaders', 'manifestos', 'accountability', 'participate'];

  return (
    <Nav variant="pills" className="flex-wrap gap-2 mb-4">
      {tabs.map((tab) => (
        <Nav.Item key={tab}>
          <Nav.Link
            active={activeTab === tab}
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