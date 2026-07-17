import { useState, useEffect, useCallback } from 'react';

const TOKEN_KEY = 'datacraftr_admin_token';
const ADMIN_KEY = 'datacraftr_admin_data';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export interface AdminUser {
  id: string;
  mobile: string;
  name: string;
}

export function useAdminAuth() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const adminData = sessionStorage.getItem(ADMIN_KEY);
    const loginTime = sessionStorage.getItem('datacraftr_admin_login_time');

    if (token && adminData && loginTime) {
      const elapsed = Date.now() - parseInt(loginTime);
      if (elapsed > SESSION_TIMEOUT) {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(ADMIN_KEY);
        sessionStorage.removeItem('datacraftr_admin_login_time');
      } else {
        try {
          setAdmin(JSON.parse(adminData));
        } catch {
          sessionStorage.removeItem(TOKEN_KEY);
          sessionStorage.removeItem(ADMIN_KEY);
        }
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (mobile: string, password: string) => {
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-login`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ mobile, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Login failed');
    }

    const data = await response.json();
    sessionStorage.setItem(TOKEN_KEY, data.token);
    sessionStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
    sessionStorage.setItem('datacraftr_admin_login_time', Date.now().toString());
    setAdmin(data.admin);
    return data.admin;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_KEY);
    sessionStorage.removeItem('datacraftr_admin_login_time');
    setAdmin(null);
  }, []);

  return { admin, loading, login, logout };
}
