//src/components/station/StationSearchBar.jsx
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

export default function StationSearchBar({ value, onChange, placeholder = 'Search county, constituency, ward, station, or code...' }) {
  return (
    <InputGroup className="shadow-sm">
      <InputGroup.Text className="bg-white border-end-0">
        <Search className="text-muted" />
      </InputGroup.Text>
      <Form.Control
        className="py-3 border-start-0"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  );
}