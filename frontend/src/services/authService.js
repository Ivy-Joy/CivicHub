// ALL API calls 
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
    throw new Error(data?.message || 'Something went wrong');
  }
  return data;
}

export const authService = {
  register(payload) {
    return request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  verifyOtp(payload) {
    return request('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  createPassword(payload) {
    return request('/api/auth/create-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  login(payload) {
    return request('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  me(token) {
    return request('/api/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  resendVerification(payload) {
    return request('/api/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  requestPasswordReset(payload) {
    return request('/api/auth/request-password-reset', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  resetPassword(payload) {
    return request('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  logout() {
    return request('/api/auth/logout', {
      method: 'POST',
    });
  },
};