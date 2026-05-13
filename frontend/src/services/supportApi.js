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

export const supportApi = {
  getHub() {
    return request('/api/support/hub');
  },
  createDonation(payload) {
    return request('/api/support/donations', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};