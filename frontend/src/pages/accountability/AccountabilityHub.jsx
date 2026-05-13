import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AccountabilityHeader from '../../components/civic/accountability/AccountabilityHeader';
import KPIGrid from '../../components/civic/accountability/KPIGrid';
import ProcurementTable from '../../components/civic/accountability/ProcurementTable';
import ReportFormCard from '../../components/civic/accountability/ReportFormCard';
import OfficialsPanel from '../../components/civic/accountability/OfficialsPanel';
import { civicApi } from '../../services/civicApi';

export default function AccountabilityHub() {
  const [hub, setHub] = useState({
    metrics: { budgetProgress: 0, procurementCount: 0, reportsCount: 0, officialsCount: 0 },
    procurement: [],
    officials: [],
  });

  useEffect(() => {
    async function load() {
      const data = await civicApi.getAccountabilityHub();
      const payload = data?.data || data;
      setHub(payload);
    }
    load();
  }, []);

  return (
    <div style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #eef3f9 100%)', minHeight: '100vh' }}>
      <Container className="py-4 py-lg-5">
        <AccountabilityHeader area={hub.area} />
        <KPIGrid metrics={hub.metrics || {}} />

        <Row className="g-4 mt-3">
          <Col lg={8}>
            <ProcurementTable items={hub.procurement || []} />
          </Col>
          <Col lg={4}>
            <ReportFormCard />
            <div className="mt-4">
              <OfficialsPanel officials={hub.officials || []} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}