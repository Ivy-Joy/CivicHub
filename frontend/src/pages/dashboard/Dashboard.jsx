import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, ProgressBar, Alert, Spinner } from 'react-bootstrap';
import {
  GeoAltFill,
  PeopleFill,
  BellFill,
  ClipboardDataFill,
  HeartFill,
  PencilSquare,
  JournalText,
  MegaphoneFill,
  ShieldCheck,
} from 'react-bootstrap-icons';
import { dashboardApi } from '../../services/dashboardApi';

function initials(firstName, lastName) {
  return `${(firstName?.[0] || 'C').toUpperCase()}${(lastName?.[0] || 'H').toUpperCase()}`;
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 22 }}>
      <Card.Body className="p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="rounded-4 d-flex align-items-center justify-content-center" style={{ width: 50, height: 50, background: 'rgba(13,110,253,0.08)' }}>
            <Icon size={22} />
          </div>
        </div>
        <div className="fw-bold fs-3">{value}</div>
        <div className="text-muted small">{label}</div>
      </Card.Body>
    </Card>
  );
}

function SectionCard({ title, action, children }) {
  return (
    <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
      <Card.Body className="p-4 p-md-5">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h5 className="fw-bold mb-0">{title}</h5>
          {action}
        </div>
        {children}
      </Card.Body>
    </Card>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [overview, setOverview] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    county: '',
    constituency: '',
    ward: '',
    interests: [],
  });

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [overviewRes, activityRes] = await Promise.all([
        dashboardApi.getOverview(),
        dashboardApi.getActivity(),
      ]);

      const overviewData = overviewRes?.data || overviewRes;
      const activityData = activityRes?.data || activityRes;

      setOverview(overviewData);
      setActivity(Array.isArray(activityData) ? activityData : []);

      setProfileForm({
        firstName: overviewData?.profile?.firstName || '',
        lastName: overviewData?.profile?.lastName || '',
        county: overviewData?.profile?.county || '',
        constituency: overviewData?.profile?.constituency || '',
        ward: overviewData?.profile?.ward || '',
        interests: overviewData?.profile?.interests || [],
      });
    } catch (err) {
      setError(err.message || 'Could not load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const profile = overview?.profile;
  const stats = overview?.stats || {};
  const savedStations = overview?.savedStations || [];
  const followedLeaders = overview?.followedLeaders || [];
  const alerts = overview?.alerts || [];

  const completion = useMemo(() => {
    let score = 0;
    if (profile?.firstName) score += 1;
    if (profile?.lastName) score += 1;
    if (profile?.county) score += 1;
    if (profile?.constituency) score += 1;
    if (profile?.ward) score += 1;
    if ((profile?.interests || []).length) score += 1;
    return Math.round((score / 6) * 100);
  }, [profile]);

  const saveProfile = async () => {
    setSavingProfile(true);
    try {
      await dashboardApi.updateProfile(profileForm);
      setShowProfile(false);
      await load();
    } catch (err) {
      setError(err.message || 'Could not save profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const toggleLeaderFollow = async (leaderId, isFollowing) => {
    try {
      if (isFollowing) {
        await dashboardApi.unfollowLeader(leaderId);
      } else {
        await dashboardApi.followLeader(leaderId);
      }
      await load();
    } catch (err) {
      setError(err.message || 'Could not update leader follow state');
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="text-center">
          <Spinner animation="border" />
          <div className="mt-3 text-muted">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #eef3f9 100%)', minHeight: '100vh' }}>
      <Container className="py-4 py-lg-5">
        {error ? <Alert variant="danger">{error}</Alert> : null}

        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 28 }}>
          <Card.Body className="p-4 p-md-5">
            <Row className="align-items-center g-4">
              <Col lg={8}>
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                    style={{ width: 72, height: 72, background: 'linear-gradient(135deg, #0d6efd, #0b5ed7)' }}
                  >
                    {initials(profile?.firstName, profile?.lastName)}
                  </div>

                  <div>
                    <div className="text-uppercase small fw-semibold text-muted">Welcome back</div>
                    <h2 className="fw-bold mb-1">
                      {profile?.firstName ? `${profile.firstName} ${profile.lastName || ''}` : 'CivicHub citizen'}
                    </h2>
                    <div className="text-muted">
                      {profile?.county || 'No county set'} • {profile?.constituency || 'No constituency set'} • {profile?.ward || 'No ward set'}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="d-flex justify-content-between small text-muted mb-2">
                    <span>Profile completion</span>
                    <span>{completion}%</span>
                  </div>
                  <ProgressBar now={completion} />
                </div>
              </Col>

              <Col lg={4}>
                <div className="d-grid gap-2">
                  <Button onClick={() => navigate('/locate')}>
                    <GeoAltFill className="me-2" /> Find Station
                  </Button>
                  <Button variant="outline-primary" onClick={() => navigate('/read')}>
                    <JournalText className="me-2" /> Learn
                  </Button>
                  <Button variant="outline-primary" onClick={() => navigate('/support')}>
                    <HeartFill className="me-2" /> Support CivicHub
                  </Button>
                  <Button variant="outline-dark" onClick={() => setShowProfile(true)}>
                    <PencilSquare className="me-2" /> Edit Profile
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row className="g-3 mb-4">
          <Col md={3}><StatCard icon={GeoAltFill} label="Saved stations" value={stats.savedStations || 0} /></Col>
          <Col md={3}><StatCard icon={PeopleFill} label="Followed leaders" value={stats.followedLeaders || 0} /></Col>
          <Col md={3}><StatCard icon={MegaphoneFill} label="Participation actions" value={stats.participationCount || 0} /></Col>
          <Col md={3}><StatCard icon={ClipboardDataFill} label="Reports filed" value={stats.reportCount || 0} /></Col>
        </Row>

        <Row className="g-4">
          <Col lg={7}>
            <SectionCard title="Saved stations">
              {savedStations.length ? (
                <div className="d-grid gap-3">
                  {savedStations.map((station) => (
                    <div key={station.id} className="p-3 bg-light rounded-4">
                      <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                        <div>
                          <div className="fw-semibold">{station.name}</div>
                          <div className="small text-muted">
                            {station.county} • {station.constituency} • {station.ward} • {station.code}
                          </div>
                          <div className="small text-muted">{station.openHours}</div>
                        </div>
                        <Badge bg={station.isOpen ? 'success' : 'secondary'} className="rounded-pill px-3 py-2">
                          {station.isOpen ? 'Open' : 'Closed'}
                        </Badge>
                      </div>
                      <div className="d-flex gap-2 mt-3 flex-wrap">
                        <Button size="sm" onClick={() => navigate('/locate')}>
                          Open locator
                        </Button>
                        <Button size="sm" variant="outline-primary" onClick={() => navigate('/whorepresents', { state: { stationId: station.id } })}>
                          Open area hub
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted">No stations saved yet. Use the locator to save one.</div>
              )}
            </SectionCard>
          </Col>

          <Col lg={5}>
            <SectionCard
              title="Alerts"
              action={<Badge bg="info" className="rounded-pill px-3 py-2">{alerts.length}</Badge>}
            >
              <div className="d-grid gap-3">
                {alerts.length ? alerts.map((item) => (
                  <div key={item.id} className="p-3 bg-light rounded-4">
                    <div className="fw-semibold">{item.title}</div>
                    <div className="small text-muted">{item.detail}</div>
                  </div>
                )) : (
                  <div className="text-muted">No alerts right now.</div>
                )}
              </div>
            </SectionCard>
          </Col>
        </Row>

        <Row className="g-4 mt-1">
          <Col lg={6}>
            <SectionCard
              title="Followed leaders"
              action={<Badge bg="secondary" className="rounded-pill px-3 py-2">{followedLeaders.length}</Badge>}
            >
              <div className="d-grid gap-3">
                {followedLeaders.length ? followedLeaders.map((leader) => {
                  const isFollowing = true;
                  return (
                    <div key={leader.id} className="p-3 bg-light rounded-4">
                      <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                        <div>
                          <div className="fw-semibold">{leader.office}</div>
                          <div className="small text-muted">{leader.name}</div>
                          <div className="small text-muted">{leader.party}</div>
                        </div>
                        <Button size="sm" variant="outline-primary" onClick={() => toggleLeaderFollow(leader.id, isFollowing)}>
                          Unfollow
                        </Button>
                      </div>
                      <div className="small text-muted mt-2">{leader.roleSummary}</div>
                    </div>
                  );
                }) : (
                  <div className="text-muted">You have not followed any leaders yet.</div>
                )}
              </div>
            </SectionCard>
          </Col>

          <Col lg={6}>
            <SectionCard title="Participation history">
              <div className="d-grid gap-3">
                {overview?.participationHistory?.length ? overview.participationHistory.map((item) => (
                  <div key={item._id} className="p-3 bg-light rounded-4">
                    <div className="fw-semibold">{item.title}</div>
                    <div className="small text-muted">{item.detail}</div>
                  </div>
                )) : (
                  <div className="text-muted">No participation history yet.</div>
                )}
              </div>
            </SectionCard>
          </Col>
        </Row>

        <Row className="g-4 mt-1">
          <Col lg={6}>
            <SectionCard title="Report history">
              <div className="d-grid gap-3">
                {overview?.reportHistory?.length ? overview.reportHistory.map((item) => (
                  <div key={item._id} className="p-3 bg-light rounded-4">
                    <div className="fw-semibold">{item.title}</div>
                    <div className="small text-muted">{item.detail}</div>
                  </div>
                )) : (
                  <div className="text-muted">No reports submitted yet.</div>
                )}
              </div>
            </SectionCard>
          </Col>

          <Col lg={6}>
            <SectionCard title="Civic shortcuts">
              <div className="d-grid gap-2">
                <Button variant="outline-primary" onClick={() => navigate('/dates')}>
                  Election timelines
                </Button>
                <Button variant="outline-primary" onClick={() => navigate('/read')}>
                  Constitution lessons
                </Button>
                <Button variant="outline-primary" onClick={() => navigate('/support')}>
                  Support / donate
                </Button>
              </div>

              <div className="mt-4 p-4 bg-dark text-white rounded-4">
                <div className="fw-semibold mb-1">Campaign tools stay separate</div>
                <div className="small text-white-50">
                  Candidate and party management belongs in a different role-based workspace. This dashboard is for citizens.
                </div>
              </div>
            </SectionCard>
          </Col>
        </Row>
      </Container>

      <Modal show={showProfile} onHide={() => setShowProfile(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Control
                placeholder="First name"
                value={profileForm.firstName}
                onChange={(e) => setProfileForm((s) => ({ ...s, firstName: e.target.value }))}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                placeholder="Last name"
                value={profileForm.lastName}
                onChange={(e) => setProfileForm((s) => ({ ...s, lastName: e.target.value }))}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                placeholder="County"
                value={profileForm.county}
                onChange={(e) => setProfileForm((s) => ({ ...s, county: e.target.value }))}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                placeholder="Constituency"
                value={profileForm.constituency}
                onChange={(e) => setProfileForm((s) => ({ ...s, constituency: e.target.value }))}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                placeholder="Ward"
                value={profileForm.ward}
                onChange={(e) => setProfileForm((s) => ({ ...s, ward: e.target.value }))}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfile(false)}>Cancel</Button>
          <Button onClick={saveProfile} disabled={savingProfile}>
            {savingProfile ? 'Saving...' : 'Save changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}