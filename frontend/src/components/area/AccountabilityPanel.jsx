//src/components/area/AccountabilityPanel.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function AccountabilityPanel({ data, onOpenReport, onOpenBudget, onOpenProcurement }) {
  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4">
        <div className="text-uppercase small fw-semibold text-muted mb-1">Accountability</div>
        <h5 className="fw-bold mb-3">Track spending, procurement, and follow-up</h5>

        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <div className="p-3 bg-light rounded-4 text-center">
              <div className="fw-bold fs-5">{data?.budgetProgress ?? '—'}%</div>
              <div className="small text-muted">Budget progress</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-light rounded-4 text-center">
              <div className="fw-bold fs-5">{data?.procurementCount ?? '—'}</div>
              <div className="small text-muted">Procurement items</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-light rounded-4 text-center">
              <div className="fw-bold fs-5">{data?.reportsCount ?? '—'}</div>
              <div className="small text-muted">Reports</div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <Button size="sm" onClick={onOpenBudget}>Public expenditure</Button>
          <Button size="sm" variant="outline-primary" onClick={onOpenProcurement}>Procurement</Button>
          <Button size="sm" variant="outline-dark" onClick={onOpenReport}>Report corruption</Button>
        </div>
      </Card.Body>
    </Card>
  );
}