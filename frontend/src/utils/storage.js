//localStorage helper
export const TOKEN_KEY = 'civichub_access_token';
export const USER_KEY = 'civichub_user';
export const GUEST_KEY = 'civichub_guest_mode';

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function setGuestMode(value = true) {
  if (value) localStorage.setItem(GUEST_KEY, 'true');
  else localStorage.removeItem(GUEST_KEY);
}

export function isGuestMode() {
  return localStorage.getItem(GUEST_KEY) === 'true';
}