import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar, Badge, Alert, Spinner, Nav } from 'react-bootstrap';
import { HeartFill, ShieldCheck, CashCoin, Receipt, GraphUpArrow } from 'react-bootstrap-icons';
import { supportApi } from '../../services/supportApi';

function StatBox({ label, value }) {
  return (
    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 22 }}>
      <Card.Body className="p-4 text-center">
        <div className="fw-bold fs-3">{value}</div>
        <div className="text-muted small">{label}</div>
      </Card.Body>
    </Card>
  );
}

export default function DonateSupport() {
  const [hub, setHub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('support');
  const [form, setForm] = useState({
    campaignId: '',
    donorName: '',
    email: '',
    phone: '',
    amount: '',
    anonymous: false,
    paymentReference: '',
    note: '',
  });

  const loadHub = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await supportApi.getHub();
      const payload = data?.data || data;
      setHub(payload);
      if (!form.campaignId && payload?.campaigns?.length) {
        setForm((s) => ({ ...s, campaignId: payload.campaigns[0]._id || payload.campaigns[0].id }));
      }
    } catch (err) {
      setError(err.message || 'Could not load support hub');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedCampaign = useMemo(
    () => hub?.campaigns?.find((c) => String(c._id || c.id) === String(form.campaignId)),
    [hub, form.campaignId]
  );

  const submitDonation = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess('');
    setError('');

    try {
      await supportApi.createDonation({
        ...form,
        amount: Number(form.amount),
      });
      setSuccess('Support recorded successfully.');
      setForm((s) => ({
        ...s,
        donorName: '',
        email: '',
        phone: '',
        amount: '',
        anonymous: false,
        paymentReference: '',
        note: '',
      }));
      await loadHub();
    } catch (err) {
      setError(err.message || 'Could not submit support');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="text-center">
          <Spinner animation="border" />
          <div className="mt-3 text-muted">Loading support hub...</div>
        </div>
      </div>
    );
  }

  const totals = hub?.totals || { targetAmount: 0, raisedAmount: 0, disbursedAmount: 0 };
  const raisedPercent = totals.targetAmount ? Math.min(100, Math.round((totals.raisedAmount / totals.targetAmount) * 100)) : 0;

  return (
    <div style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #eef3f9 100%)', minHeight: '100vh' }}>
      <Container className="py-4 py-lg-5">
        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 28 }}>
          <Card.Body className="p-4 p-md-5">
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #dc3545, #b02a37)' }}>
                <HeartFill size={24} />
              </div>
              <div className="flex-grow-1">
                <div className="text-uppercase small fw-semibold text-muted">Donate / Support</div>
                <h2 className="fw-bold mb-1">Help CivicHub stay useful, secure, and transparent</h2>
                <div className="text-muted">
                  Funding supports maintenance, platform operations, civic education, and transparent disbursement.
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="d-flex justify-content-between small text-muted mb-2">
                <span>Overall funding progress</span>
                <span>{raisedPercent}%</span>
              </div>
              <ProgressBar now={raisedPercent} />
            </div>
          </Card.Body>
        </Card>

        {error ? <Alert variant="danger">{error}</Alert> : null}
        {success ? <Alert variant="success">{success}</Alert> : null}

        <Row className="g-3 mb-4">
          <Col md={4}><StatBox label="Target amount" value={`KES ${Number(totals.targetAmount || 0).toLocaleString()}`} /></Col>
          <Col md={4}><StatBox label="Raised so far" value={`KES ${Number(totals.raisedAmount || 0).toLocaleString()}`} /></Col>
          <Col md={4}><StatBox label="Disbursed" value={`KES ${Number(totals.disbursedAmount || 0).toLocaleString()}`} /></Col>
        </Row>

        <Nav variant="pills" className="gap-2 mb-4 flex-wrap">
          <Nav.Item>
            <Nav.Link active={activeTab === 'support'} onClick={() => setActiveTab('support')} style={{ cursor: 'pointer' }}>Support</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'transparency'} onClick={() => setActiveTab('transparency')} style={{ cursor: 'pointer' }}>Transparency</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'disbursement'} onClick={() => setActiveTab('disbursement')} style={{ cursor: 'pointer' }}>Disbursement</Nav.Link>
          </Nav.Item>
        </Nav>

        {activeTab === 'support' && (
          <Row className="g-4">
            <Col lg={7}>
              <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4 p-md-5">
                  <h4 className="fw-bold mb-3">Make a contribution</h4>

                  <Form onSubmit={submitDonation} className="d-grid gap-3">
                    <Form.Select value={form.campaignId} onChange={(e) => setForm((s) => ({ ...s, campaignId: e.target.value }))}>
                      <option value="">Select a support campaign</option>
                      {(hub?.campaigns || []).map((campaign) => (
                        <option key={campaign._id || campaign.id} value={campaign._id || campaign.id}>
                          {campaign.title}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Control
                      placeholder="Your name"
                      value={form.donorName}
                      onChange={(e) => setForm((s) => ({ ...s, donorName: e.target.value }))}
                    />
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Control
                          placeholder="Email"
                          value={form.email}
                          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          placeholder="Phone"
                          value={form.phone}
                          onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                        />
                      </Col>
                    </Row>

                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Control
                          type="number"
                          min="1"
                          placeholder="Amount"
                          value={form.amount}
                          onChange={(e) => setForm((s) => ({ ...s, amount: e.target.value }))}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          placeholder="Payment reference"
                          value={form.paymentReference}
                          onChange={(e) => setForm((s) => ({ ...s, paymentReference: e.target.value }))}
                        />
                      </Col>
                    </Row>

                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Optional note"
                      value={form.note}
                      onChange={(e) => setForm((s) => ({ ...s, note: e.target.value }))}
                    />

                    <Form.Check
                      type="checkbox"
                      label="Donate anonymously"
                      checked={form.anonymous}
                      onChange={(e) => setForm((s) => ({ ...s, anonymous: e.target.checked }))}
                    />

                    <Button type="submit" size="lg" disabled={submitting || !form.campaignId || !form.amount}>
                      {submitting ? 'Submitting...' : 'Support CivicHub'}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4">
                  <div className="text-uppercase small fw-semibold text-muted mb-1">Selected campaign</div>
                  <h5 className="fw-bold mb-2">{selectedCampaign?.title || 'No campaign selected'}</h5>
                  <p className="text-muted small">{selectedCampaign?.purpose || 'Choose a support campaign to see details.'}</p>

                  <div className="p-3 bg-light rounded-4 mb-3">
                    <div className="fw-semibold mb-1">What your support helps with</div>
                    <div className="small text-muted">{selectedCampaign?.allocationDescription || 'Platform maintenance, infrastructure, civic education, and transparent operations.'}</div>
                  </div>

                  <div className="d-grid gap-2">
                    <Button variant="outline-primary" onClick={() => setActiveTab('transparency')}>
                      <ShieldCheck className="me-2" /> View transparency
                    </Button>
                    <Button variant="outline-dark" onClick={() => setActiveTab('disbursement')}>
                      <Receipt className="me-2" /> See disbursement
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {activeTab === 'transparency' && (
          <Row className="g-4">
            <Col lg={7}>
              <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4 p-md-5">
                  <h4 className="fw-bold mb-3">Active campaigns</h4>
                  <div className="d-grid gap-3">
                    {(hub?.campaigns || []).map((campaign) => {
                      const percent = campaign.targetAmount
                        ? Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100))
                        : 0;
                      return (
                        <div key={campaign._id || campaign.id} className="p-3 bg-light rounded-4">
                          <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                            <div>
                              <div className="fw-semibold">{campaign.title}</div>
                              <div className="small text-muted">{campaign.purpose}</div>
                            </div>
                            <Badge bg="primary">{campaign.category}</Badge>
                          </div>
                          <div className="mt-3">
                            <div className="d-flex justify-content-between small text-muted mb-2">
                              <span>KES {Number(campaign.raisedAmount || 0).toLocaleString()}</span>
                              <span>KES {Number(campaign.targetAmount || 0).toLocaleString()}</span>
                            </div>
                            <ProgressBar now={percent} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3">Recent support</h5>
                  <div className="d-grid gap-3">
                    {(hub?.donations || []).map((donation) => (
                      <div key={donation._id} className="p-3 bg-light rounded-4">
                        <div className="fw-semibold">
                          {donation.anonymous ? 'Anonymous supporter' : donation.donorName || 'Supporter'}
                        </div>
                        <div className="small text-muted">
                          KES {Number(donation.amount || 0).toLocaleString()} • {donation.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3">Why transparency matters</h5>
                  <p className="text-muted mb-0">
                    Support is separated from voter tools. This page shows what is funded, what is planned, and how money is tracked.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {activeTab === 'disbursement' && (
          <Row className="g-4">
            <Col lg={7}>
              <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4 p-md-5">
                  <h4 className="fw-bold mb-3">Disbursement plan</h4>
                  <div className="d-grid gap-3">
                    {(hub?.disbursements || []).map((item) => (
                      <div key={item._id} className="p-3 bg-light rounded-4">
                        <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                          <div>
                            <div className="fw-semibold">{item.title}</div>
                            <div className="small text-muted">{item.note || 'No note available'}</div>
                          </div>
                          <Badge bg={item.status === 'Completed' ? 'success' : item.status === 'Released' ? 'primary' : 'secondary'}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="small text-muted mt-2">
                          {item.amountLabel || `KES ${Number(item.amount || 0).toLocaleString()}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4">
                  <div className="text-uppercase small fw-semibold text-muted mb-1">Disbursement notes</div>
                  <h5 className="fw-bold mb-3">How funds are used</h5>
                  <div className="d-grid gap-2">
                    <div className="p-3 bg-light rounded-4">Platform hosting and uptime</div>
                    <div className="p-3 bg-light rounded-4">Security and maintenance</div>
                    <div className="p-3 bg-light rounded-4">Civic education content and updates</div>
                    <div className="p-3 bg-light rounded-4">Community support and operations</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}