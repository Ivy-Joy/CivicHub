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
  if (!res.ok) {
    throw new Error(data?.message || 'Request failed');
  }
  return data;
}

export const civicApi = {
  searchStations(query, position) {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (position?.lat && position?.lng) {
      params.set('lat', String(position.lat));
      params.set('lng', String(position.lng));
    }
    return request(`/api/civic/stations/search?${params.toString()}`);
  },

  getStationById(id) {
    return request(`/api/civic/stations/${id}`);
  },

  getAreaByStationId(stationId) {
    return request(`/api/civic/areas/by-station/${stationId}`);
  },

  getAreaHub(areaId) {
    return request(`/api/civic/areas/${areaId}/hub`);
  },

  getLeaderDetail(leaderId) {
    return request(`/api/civic/leaders/${leaderId}`);
  },

  compareLeaders(leaderIds) {
    const params = new URLSearchParams();
    leaderIds.forEach((id) => params.append('leaderIds', id));
    return request(`/api/civic/leaders/compare?${params.toString()}`);
  },
  getEducationHub() {
    return request('/api/civic/education/hub');
  },
  getLessonBySlug(slug) {
    return request(`/api/civic/education/lessons/${slug}`);
  },

  getParticipationHub() {
    return request('/api/civic/participation/hub');
  },
  createPetition(payload) {
    return request('/api/civic/participation/petitions', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  createPollVote(pollId, payload) {
    return request(`/api/civic/participation/polls/${pollId}/vote`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  createConsultation(payload) {
    return request('/api/civic/participation/consultations', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  messageLeader(payload) {
    return request('/api/civic/participation/messages', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  getAccountabilityHub() {
    return request('/api/civic/accountability/hub');
  },
  submitCorruptionReport(payload) {
    return request('/api/civic/accountability/reports', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};