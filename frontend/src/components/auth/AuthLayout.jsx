//frontend/src/components/auth/AuthLayout.jsx
import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { ShieldLock, CheckCircle, Star, LightningCharge } from 'react-bootstrap-icons';

export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'radial-gradient(circle at 0% 0%, rgba(25, 135, 84, 0.08) 0%, transparent 40%), radial-gradient(circle at 100% 0%, rgba(220, 53, 69, 0.08) 0%, transparent 40%), #07111f',
        padding: '40px 0'
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={11} xl={10}>
            <Card 
              className="border-0 shadow-lg overflow-hidden" 
              style={{ 
                borderRadius: '32px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              <Row className="g-0">
                {/* Branding Sidebar */}
                <Col
                  lg={5}
                  className="text-white p-4 p-md-5 d-flex flex-column"
                  style={{ 
                    background: 'linear-gradient(165deg, #0d1727 0%, #162e4a 100%)',
                    borderRight: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div className="mb-auto">
                    <div className="d-flex align-items-center gap-3 mb-5">
                      <div
                        className="rounded-4 d-flex align-items-center justify-content-center"
                        style={{ 
                          width: 54, 
                          height: 54, 
                          background: 'rgba(255,255,255,0.08)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        <ShieldLock size={28} className="text-info" />
                      </div>
                      <div>
                        <div className="fw-bold fs-4 tracking-tight">CivicHub</div>
                        <div className="small text-info opacity-75 fw-medium">Secure civic access</div>
                      </div>
                    </div>

                    <Badge 
                      bg="info" 
                      className="mb-3 rounded-pill px-3 py-2 text-dark fw-bold"
                      style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}
                    >
                      {eyebrow}
                    </Badge>

                    <h1 className="fw-bold mb-3 display-6" style={{ lineHeight: 1.2 }}>
                      {title}
                    </h1>
                    <p className="text-white-50 mb-5 fs-5 shadow-sm" style={{ maxWidth: 400, lineHeight: 1.5 }}>
                      {subtitle}
                    </p>

                    <div className="d-grid gap-4">
                      <div className="d-flex align-items-start gap-3">
                        <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                          <CheckCircle size={20} className="text-success" />
                        </div>
                        <div>
                          <div className="fw-semibold">Privacy-first</div>
                          <div className="small text-white-50">Minimal data at the front door.</div>
                        </div>
                      </div>

                      <div className="d-flex align-items-start gap-3">
                        <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                          <Star size={20} className="text-warning" />
                        </div>
                        <div>
                          <div className="fw-semibold">Premium flow</div>
                          <div className="small text-white-50">Short steps, clear actions, smooth handoff.</div>
                        </div>
                      </div>

                      <div className="d-flex align-items-start gap-3">
                        <div className="p-2 rounded-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                          <LightningCharge size={20} className="text-info" />
                        </div>
                        <div>
                          <div className="fw-semibold">Guest friendly</div>
                          <div className="small text-white-50">Browse first, register later.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Main Content Area */}
                <Col lg={7} className="bg-white p-4 p-md-5 d-flex flex-column justify-content-center">
                  <div style={{ maxWidth: '440px', margin: '0 auto', width: '100%' }}>
                    {children}
                    {footer && (
                      <div className="mt-5 pt-4 border-top border-light text-center">
                        {footer}
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}