//ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, isGuestMode } from '../../utils/storage';

export default function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token && !isGuestMode()) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
