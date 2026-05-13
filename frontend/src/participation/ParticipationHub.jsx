import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ParticipationTabs from '../../components/civic/participation/ParticipationTabs';
import PetitionCard from '../../components/civic/participation/PetitionCard';
import PollCard from '../../components/civic/participation/PollCard';
import ConsultationCard from '../../components/civic/participation/ConsultationCard';
import MessageLeaderCard from '../../components/civic/participation/MessageLeaderCard';
import { civicHubApi } from '../../services/civicHubApi';

export default function ParticipationHub() {
  const [activeTab, setActiveTab] = useState('petitions');
  const [hub, setHub] = useState({ petitions: [], polls: [], consultations: [], leaders: [] });

  useEffect(() => {
    async function load() {
      const data = await civicHubApi.getParticipationHub();
      const payload = data?.data || data;
      setHub(payload);
    }
    load();
  }, []);

  return (
    <div style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #eef3f9 100%)', minHeight: '100vh' }}>
      <Container className="py-4 py-lg-5">
        <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 24 }}>
          <Card.Body className="p-4 p-md-5">
            <div className="text-uppercase small fw-semibold text-muted mb-1">Participation Hub</div>
            <h2 className="fw-bold mb-2">Public participation, simplified</h2>
            <p className="text-muted mb-0">
              Use petitions, polls, consultations, and direct messages to take part in civic action.
            </p>
          </Card.Body>
        </Card>

        <ParticipationTabs active={activeTab} onChange={setActiveTab} />

        {activeTab === 'petitions' && (
          <Row className="g-4">
            <Col lg={7}><PetitionCard /></Col>
            <Col lg={5}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3">Recent petitions</h5>
                  <div className="d-grid gap-2">
                    {(hub.petitions || []).map((item) => (
                      <div key={item._id || item.id} className="p-3 bg-light rounded-4">
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

        {activeTab === 'polls' && (
          <Row className="g-4">
            {(hub.polls || []).map((poll) => (
              <Col md={6} key={poll._id || poll.id}>
                <PollCard
                  poll={poll}
                  onVote={async (pollId, option) => {
                    await civicHubApi.createPollVote(pollId, { option });
                  }}
                />
              </Col>
            ))}
          </Row>
        )}

        {activeTab === 'consultations' && (
          <Row className="g-4">
            {(hub.consultations || []).map((consultation) => (
              <Col md={6} key={consultation._id || consultation.id}>
                <ConsultationCard consultation={consultation} onOpen={() => {}} />
              </Col>
            ))}
          </Row>
        )}

        {activeTab === 'messages' && (
          <Row className="g-4">
            <Col lg={7}><MessageLeaderCard leaders={hub.leaders || []} /></Col>
            <Col lg={5}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 24 }}>
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3">Why this matters</h5>
                  <p className="text-muted mb-0">
                    A separate participation hub keeps action tools away from locator and education screens, so the experience stays premium and focused.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}