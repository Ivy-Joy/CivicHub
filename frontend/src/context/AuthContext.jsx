//global auth state (user, token, guest)
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import {
  clearAuth,
  getToken,
  getUser,
  saveToken,
  saveUser,
  isGuestMode,
  setGuestMode,
} from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(getToken());
  const [guest, setGuest] = useState(isGuestMode());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMe() {
      try {
        if (token) {
          const data = await authService.me(token);
          setUser(data.user);
          saveUser(data.user);
        }
      } catch {
        clearAuth();
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }

    loadMe();
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      token,
      guest,
      loading,
      isAuthenticated: !!token && !guest,
      setSession: ({ accessToken, user: nextUser }) => {
        if (accessToken) {
          setToken(accessToken);
          saveToken(accessToken);
        }
        if (nextUser) {
          setUser(nextUser);
          saveUser(nextUser);
        }
        setGuest(false);
        setGuestMode(false);
      },
      setGuestSession: () => {
        clearAuth();
        setUser(null);
        setToken(null);
        setGuest(true);
        setGuestMode(true);
      },
      logout: async () => {
        try {
          await authService.logout();
        } catch {}
        clearAuth();
        setUser(null);
        setToken(null);
        setGuest(false);
        setGuestMode(false);
      },
    }),
    [user, token, guest, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}