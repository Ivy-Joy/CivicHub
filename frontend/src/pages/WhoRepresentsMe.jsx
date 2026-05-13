// src/pages/WhoRepresentsMe.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Modal, Button, Badge } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { civicApi } from '../services/civicApi';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import AreaHeader from '../components/area/AreaHeader';
import AreaSnapshotCard from '../components/area/AreaSnapshotCard';
import AreaTabs from '../components/area/AreaTabs';
import LeaderMiniCard from '../components/area/LeaderMiniCard';
import ManifestoCompareCard from '../components/area/ManifestoCompareCard';
import AccountabilityPanel from '../components/area/AccountabilityPanel';
import ParticipationPanel from '../components/area/ParticipationPanel';

export default function WhoRepresentsMe() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [area, setArea] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [showLeaderModal, setShowLeaderModal] = useState(false);
  const [compareItems, setCompareItems] = useState([]);

  const areaId = location.state?.areaId || null;
  const stationId = location.state?.stationId || null;

  const loadArea = async () => {
    setLoading(true);
    setError('');

    try {
      // ================= MOCK DATA FOR PRESENTATION =================
      const mockPayload = {
        id: "area-123",
        name: "Westlands Constituency",
        county: "Nairobi",
        ward: "Loresho",
        description: "A key urban constituency known for its commercial hub and residential diversity.",
        leaders: [
          {
            id: "l1",
            name: "Hon. Tim Wanyonyi",
            office: "Member of Parliament",
            party: "ODM",
            roleSummary: "Legislator representing Westlands in the National Assembly.",
            controls: ["Constituency Development Fund (NG-CDF)", "Legislative oversight", "National policy lobbying"],
            doesNotControl: ["County roads", "Garbage collection", "Water supply"],
            manifestoHighlights: "Focus on education through bursaries and upgrading school infrastructure."
          },
          {
            id: "l2",
            name: "Hon. Robert Alai",
            office: "MCA",
            party: "ODM",
            roleSummary: "Representative for Kileleshwa Ward in the Nairobi County Assembly.",
            controls: ["Ward Development Fund", "Local legislation", "County oversight"],
            doesNotControl: ["National security", "Curriculum development"],
            manifestoHighlights: "Digital literacy and improved drainage systems in Kileleshwa."
          },
          {
            id: "l3",
            name: "Johnson Sakaja",
            office: "Governor",
            party: "UDA",
            roleSummary: "Chief Executive of Nairobi City County.",
            controls: ["County Budget", "Health services", "Transport & Urban planning"],
            doesNotControl: ["National Police", "Foreign policy"],
            manifestoHighlights: "City-wide school feeding program and automated revenue collection."
          }
        ],
        manifestoCompare: [
          { id: "m1", office: "Health", highlight: "Expansion of local clinics", theme: "Healthcare" },
          { id: "m2", office: "Education", highlight: "100% bursary coverage", theme: "Education" },
          { id: "m3", office: "Security", highlight: "Installation of street lights", theme: "Infrastructure" }
        ],
        accountability: {
          items: [
            { id: "a1", title: "Kileleshwa Road Repair Project", status: "In Progress (60%)" },
            { id: "a2", title: "Ward Bursary Disbursement", status: "Completed Q1" },
            { id: "a3", title: "Market Upgrade Initiative", status: "Planning Phase" }
          ]
        }
      };

      // Set the mock data immediately
      setArea(mockPayload);
      setCompareItems(mockPayload.manifestoCompare);

      // Optional: Attempt real fetch but fall back to mock silently
      /*
      let data = null;
      if (areaId) data = await civicApi.getAreaHub(areaId);
      else if (stationId) data = await civicApi.getAreaByStationId(stationId);
      if (data) {
          const payload = data?.data || data;
          setArea(payload);
          setCompareItems(payload?.manifestoCompare || []);
      }
      */
    } catch (err) {
      console.warn("Using mock data as fallback");
    } finally {
      // Simulate slight delay for presentation realism
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    loadArea();
  }, [areaId, stationId]);

  const leaders = useMemo(() => area?.leaders || [], [area]);

  const openLeader = (leader) => {
    setSelectedLeader(leader);
    setShowLeaderModal(true);
  };

  const openCompare = async (leader) => {
    if (!leader?.id) {
      setShowLeaderModal(true);
      setSelectedLeader(leader);
      return;
    }
    setActiveTab('manifestos');
  };

  if (loading) return <LoadingState label="Loading area hub..." />;
  if (error) return <Container className="py-5"><ErrorState title="Area hub unavailable" message={error} onRetry={loadArea} /></Container>;
  
  if (!area) {
    return (
      <Container className="py-5">
        <EmptyState
          title="No area selected"
          description="Go back to Locate My Station and choose a station to open its Area Hub."
          action={<Button onClick={() => navigate('/locate')}>Go to Locate My Station</Button>}
        />
      </Container>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #eef3f9 100%)', minHeight: '100vh' }}>
      <Container className="py-4 py-lg-5">
        <AreaHeader area={area} />
        <AreaSnapshotCard area={area} />

        <AreaTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'overview' && (
          <Row className="g-4">
            <Col lg={7}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4 p-md-5">
                  <div className="text-uppercase small fw-semibold text-muted mb-1">Overview</div>
                  <h4 className="fw-bold mb-3">Your civic context in one place</h4>
                  <p className="text-muted mb-4">
                    This area hub connects the selected station to the people, office holders, promises, accountability tools, and public participation channels relevant to the area.
                  </p>

                  <Row className="g-3">
                    <Col md={6}>
                      <div className="p-3 bg-light rounded-4 h-100">
                        <div className="fw-semibold mb-1">Why this page exists</div>
                        <div className="small text-muted">
                          It prevents overcrowding by grouping leaders, manifestos, accountability, and participation into a single civic workspace.
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-3 bg-light rounded-4 h-100">
                        <div className="fw-semibold mb-1">Next step</div>
                        <div className="small text-muted">
                          Tap any leader card to see the full office profile and compare promises.
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={5}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4">
                  <div className="text-uppercase small fw-semibold text-muted mb-1">Quick access</div>
                  <h5 className="fw-bold mb-3">Open a section directly</h5>
                  <div className="d-grid gap-2">
                    <Button onClick={() => setActiveTab('leaders')}>Leaders</Button>
                    <Button variant="outline-primary" onClick={() => setActiveTab('manifestos')}>Manifestos</Button>
                    <Button variant="outline-primary" onClick={() => setActiveTab('accountability')}>Accountability</Button>
                    <Button variant="outline-dark" onClick={() => setActiveTab('participate')}>Participate</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {activeTab === 'leaders' && (
          <Row className="g-4">
            {leaders.length ? leaders.map((leader) => (
              <Col md={6} lg={4} key={leader.id}>
                <LeaderMiniCard
                  leader={leader}
                  onOpenDetail={() => openLeader(leader)}
                  onCompare={() => openCompare(leader)}
                />
              </Col>
            )) : (
              <Col>
                <EmptyState
                  title="No leaders available yet"
                  description="Your backend should return the current office holders for this area."
                />
              </Col>
            )}
          </Row>
        )}

        {activeTab === 'manifestos' && (
          <Row className="g-4">
            <Col lg={7}>
              <Card className="border-0 shadow-sm" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4 p-md-5">
                  <div className="text-uppercase small fw-semibold text-muted mb-1">Manifestos</div>
                  <h4 className="fw-bold mb-3">Compare what leaders say they will do</h4>
                  <div className="d-grid gap-3">
                    {compareItems.length ? compareItems.map((item) => (
                      <div key={item.id} className="p-3 bg-light rounded-4">
                        <div className="d-flex justify-content-between align-items-start gap-2 flex-wrap">
                          <div>
                            <div className="fw-semibold">{item.office}</div>
                            <div className="small text-muted">{item.highlight}</div>
                          </div>
                          <Badge bg="primary">{item.theme}</Badge>
                        </div>
                      </div>
                    )) : (
                      <div className="text-muted">No manifesto data returned yet.</div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={5}>
              <ManifestoCompareCard
                items={compareItems}
                onCompareAll={() => {
                  const firstLeader = leaders[0];
                  if (firstLeader) openCompare(firstLeader);
                }}
              />
            </Col>
          </Row>
        )}

        {activeTab === 'accountability' && (
          <Row className="g-4">
            <Col lg={6}>
              <AccountabilityPanel
                data={area.accountability}
                onOpenReport={() => navigate('/accountability/report', { state: { areaId: area.id } })}
                onOpenBudget={() => navigate('/accountability/budget', { state: { areaId: area.id } })}
                onOpenProcurement={() => navigate('/accountability/procurement', { state: { areaId: area.id } })}
              />
            </Col>
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4">
                  <div className="text-uppercase small fw-semibold text-muted mb-1">Public follow-up</div>
                  <h5 className="fw-bold mb-3">Track what happens after the promise</h5>
                  <div className="d-grid gap-3">
                    {(area.accountability?.items || []).map((item) => (
                      <div key={item.id} className="p-3 bg-light rounded-4">
                        <div className="fw-semibold">{item.title}</div>
                        <div className="small text-muted">{item.status}</div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {activeTab === 'participate' && (
          <Row className="g-4">
            <Col lg={5}>
              <ParticipationPanel
                onCreatePetition={() => navigate('/participation/petition', { state: { areaId: area.id } })}
                onOpenConsultation={() => navigate('/participation/consultation', { state: { areaId: area.id } })}
                onOpenPoll={() => navigate('/participation/poll', { state: { areaId: area.id } })}
                onMessageLeader={() => navigate('/participation/message', { state: { areaId: area.id } })}
              />
            </Col>
            <Col lg={7}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4 p-md-5">
                  <div className="text-uppercase small fw-semibold text-muted mb-1">Community feedback</div>
                  <h5 className="fw-bold mb-3">Give feedback and take part</h5>
                  <p className="text-muted mb-4">
                    This section includes community posts, consultations, voting polls, and follow-up summaries.
                  </p>
                  <div className="p-4 bg-light rounded-4 text-muted">
                    No active consultations in Kileleshwa this week.
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      <Modal show={showLeaderModal} onHide={() => setShowLeaderModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedLeader?.office || 'Leader detail'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
            <div>
              <h4 className="fw-bold mb-1">{selectedLeader?.name || selectedLeader?.holderName || '—'}</h4>
              <div className="text-muted">{selectedLeader?.party || selectedLeader?.department || 'Office holder'}</div>
            </div>
            <Badge bg="secondary" className="rounded-pill px-3 py-2">{selectedLeader?.office}</Badge>
          </div>
          <div className="small text-muted mb-3">{selectedLeader?.roleSummary || selectedLeader?.summary}</div>
          <div className="p-3 bg-light rounded-4 mb-3">
            <div className="fw-semibold mb-1">What this office controls</div>
            <div className="text-muted small">{Array.isArray(selectedLeader?.controls) ? selectedLeader.controls.join(', ') : selectedLeader?.controls || '—'}</div>
          </div>
          <div className="p-3 bg-light rounded-4 mb-3">
            <div className="fw-semibold mb-1">What it does not control</div>
            <div className="text-muted small">{Array.isArray(selectedLeader?.doesNotControl) ? selectedLeader.doesNotControl.join(', ') : selectedLeader?.doesNotControl || '—'}</div>
          </div>
          <div className="p-3 bg-light rounded-4">
            <div className="fw-semibold mb-1">Manifesto highlights</div>
            <div className="text-muted small">{selectedLeader?.manifestoHighlights || '—'}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={() => navigate('/leaders/compare')}>
            Compare with others
          </Button>
          <Button variant="secondary" onClick={() => setShowLeaderModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}