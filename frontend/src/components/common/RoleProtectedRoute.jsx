import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getUser } from '../../utils/storage';

export default function RoleProtectedRoute({ children, allowedRoles = [] }) {
  const token = getToken();
  const user = getUser();

  if (!token) return <Navigate to="/auth" replace />;

  if (allowedRoles.length > 0) {
    const userRoles = user?.roles || [];
    const allowed = allowedRoles.some((role) => userRoles.includes(role));
    if (!allowed) return <div className="p-4">You do not have access to this section.</div>;
  }

  return children;
}