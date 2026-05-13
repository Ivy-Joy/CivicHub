import React from 'react';
import { Card } from 'react-bootstrap';

function KpiCard({ label, value }) {
  return (
    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 22 }}>
      <Card.Body className="p-4 text-center">
        <div className="fw-bold fs-3">{value}</div>
        <div className="small text-muted">{label}</div>
      </Card.Body>
    </Card>
  );
}

export default function KPIGrid({ metrics }) {
  return (
    <div className="row g-3">
      <div className="col-md-3"><KpiCard label="Budget spent" value={`${metrics.budgetProgress}%`} /></div>
      <div className="col-md-3"><KpiCard label="Procurement items" value={metrics.procurementCount} /></div>
      <div className="col-md-3"><KpiCard label="Reports filed" value={metrics.reportsCount} /></div>
      <div className="col-md-3"><KpiCard label="Officials tracked" value={metrics.officialsCount} /></div>
    </div>
  );
}