import React from 'react';
import { Card, Table, Badge } from 'react-bootstrap';

export default function ProcurementTable({ items = [] }) {
  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4">
        <h5 className="fw-bold mb-3">Procurement tracking</h5>
        <Table responsive hover className="mb-0 align-middle">
          <thead>
            <tr>
              <th>Project</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id || item.id}>
                <td>{item.projectName}</td>
                <td>{item.vendor}</td>
                <td><Badge bg={item.status === 'Completed' ? 'success' : item.status === 'In progress' ? 'primary' : 'secondary'}>{item.status}</Badge></td>
                <td>{item.amountLabel || item.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}