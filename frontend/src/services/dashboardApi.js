//frontend/src/services/dashboardApi.js
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || 'Request failed');
  return data;
}

export const dashboardApi = {
  getOverview() {
    return request('/api/dashboard/overview');
  },
  getActivity() {
    return request('/api/dashboard/activity');
  },
  updateProfile(payload) {
    return request('/api/dashboard/profile', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },
  getFollowedLeaders() {
    return request('/api/dashboard/followed-leaders');
  },
  followLeader(leaderId) {
    return request(`/api/dashboard/followed-leaders/${leaderId}`, {
      method: 'POST',
    });
  },
  unfollowLeader(leaderId) {
    return request(`/api/dashboard/followed-leaders/${leaderId}`, {
      method: 'DELETE',
    });
  },
};