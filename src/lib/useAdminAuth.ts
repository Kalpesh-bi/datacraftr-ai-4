import { useState, useEffect, useCallback } from "react";

const TOKEN_KEY = "datacraftr_admin_token";
const ADMIN_KEY = "datacraftr_admin_data";
const LOGIN_TIME_KEY = "datacraftr_admin_login_time";
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
    try {
      const token = sessionStorage.getItem(TOKEN_KEY);
      const adminData = sessionStorage.getItem(ADMIN_KEY);
      const loginTime = sessionStorage.getItem(LOGIN_TIME_KEY);

      if (token && adminData && loginTime) {
        const elapsed = Date.now() - Number(loginTime);

        if (elapsed < SESSION_TIMEOUT) {
          setAdmin(JSON.parse(adminData));
        } else {
          sessionStorage.removeItem(TOKEN_KEY);
          sessionStorage.removeItem(ADMIN_KEY);
          sessionStorage.removeItem(LOGIN_TIME_KEY);
        }
      }
    } catch (err) {
      console.error(err);
      sessionStorage.clear();
    }

    setLoading(false);
  }, []);

  const login = useCallback(async (mobile: string, password: string) => {
    console.log("Calling admin-login...");

    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        mobile: mobile.trim(),
        password: password.trim(),
      }),
    });

    const data = await response.json();

    console.log("Admin Login Response:", data);

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    sessionStorage.setItem(TOKEN_KEY, data.token);
    sessionStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
    sessionStorage.setItem(LOGIN_TIME_KEY, Date.now().toString());

    setAdmin(data.admin);

    return data.admin;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_KEY);
    sessionStorage.removeItem(LOGIN_TIME_KEY);
    setAdmin(null);
  }, []);

  return {
    admin,
    loading,
    login,
    logout,
  };
}