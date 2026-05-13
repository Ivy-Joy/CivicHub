import React, { useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import ProfileForm from '../../components/auth/ProfileForm';

export default function CompleteProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    fullName: '',
    county: '',
    constituency: '',
    ward: '',
    interests: [],
    userId: location.state?.userId || '',
  });

  const finish = () => {
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      eyebrow="Personalize your experience"
      title="Complete your civic profile."
      subtitle="This is optional but helps CivicHub tailor alerts, stations, leaders, and community tools."
      footer={<div className="small text-muted">You can skip and finish this later from your dashboard.</div>}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Profile setup</h2>
        <Badge bg="primary" className="rounded-pill px-3 py-2">Optional</Badge>
      </div>

      <ProfileForm form={form} setForm={setForm} />

      <div className="d-grid mt-4">
        <Button size="lg" onClick={finish}>
          Finish and go to dashboard
        </Button>
      </div>
    </AuthLayout>
  );
}