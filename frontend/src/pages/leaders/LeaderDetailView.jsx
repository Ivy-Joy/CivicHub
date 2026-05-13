//reusable detail view
//src/pages/leaders/LeaderDetailView.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { civicApi } from '../../services/civicApi';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import LeaderHeader from '../../components/leader/LeaderHeader';
import RoleSummaryCard from '../../components/leader/RoleSummaryCard';
import ResponsibilitiesCard from '../../components/leader/ResponsibilitiesCard';
import OfficeHolderCard from '../../components/leader/OfficeHolderCard';
import ManifestoHighlights from '../../components/leader/ManifestoHighlights';
import CompareButton from '../../components/leader/CompareButton';

export default function LeaderDetailView() {
  const navigate = useNavigate();
  const location = useLocation();
  const leaderId = location.state?.leaderId || null;
  const [leader, setLeader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      if (!leaderId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const data = await civicApi.getLeaderDetail(leaderId);
        setLeader(data?.data || data);
      } catch (err) {
        setError(err.message || 'Could not load leader profile');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [leaderId]);

  if (loading) return <LoadingState label="Loading leader profile..." />;
  if (error) return <Container className="py-5"><ErrorState title="Leader profile unavailable" message={error} /></Container>;
  if (!leader) {
    return (
      <Container className="py-5">
        <EmptyState
          title="No leader selected"
          description="Open a leader from the Area Hub to view a detailed profile."
          action={<Button onClick={() => navigate('/whorepresents')}>Go to Area Hub</Button>}
        />
      </Container>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #eef3f9 100%)', minHeight: '100vh' }}>
      <Container className="py-4 py-lg-5">
        <LeaderHeader leader={leader} />

        <Row className="g-4">
          <Col lg={4}>
            <RoleSummaryCard leader={leader} />
          </Col>
          <Col lg={4}>
            <ResponsibilitiesCard leader={leader} />
          </Col>
          <Col lg={4}>
            <OfficeHolderCard leader={leader} />
          </Col>
        </Row>

        <div className="mt-4">
          <ManifestoHighlights leader={leader} />
        </div>

        <div className="d-flex gap-2 flex-wrap mt-4">
          <CompareButton onClick={() => navigate('/whorepresents', { state: { areaId: leader.areaId, leaderId: leader.id, compare: true } })} />
          <Button variant="outline-dark" onClick={() => navigate('/whorepresents')}>
            Back to Area Hub
          </Button>
        </div>
      </Container>
    </div>
  );
}