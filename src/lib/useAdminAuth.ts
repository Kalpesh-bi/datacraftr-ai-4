import {
  useState,
  useEffect,
  useCallback,
} from "react";

const TOKEN_KEY =
  "datacraftr_admin_token";

const ADMIN_KEY =
  "datacraftr_admin_data";

const LOGIN_TIME_KEY =
  "datacraftr_admin_login_time";

const SESSION_TIMEOUT =
  30 * 60 * 1000; // 30 minutes

export interface AdminUser {
  id: string;
  mobile: string;
  name: string;
}

export function useAdminAuth() {
  const [admin, setAdmin] =
    useState<AdminUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  /*
   * Restore existing admin session
   */
  useEffect(() => {
    try {
      const token =
        sessionStorage.getItem(
          TOKEN_KEY
        );

      const adminData =
        sessionStorage.getItem(
          ADMIN_KEY
        );

      const loginTime =
        sessionStorage.getItem(
          LOGIN_TIME_KEY
        );

      if (
        token &&
        adminData &&
        loginTime
      ) {
        const elapsed =
          Date.now() -
          Number(loginTime);

        if (
          elapsed <
          SESSION_TIMEOUT
        ) {
          setAdmin(
            JSON.parse(adminData)
          );
        } else {
          sessionStorage.removeItem(
            TOKEN_KEY
          );

          sessionStorage.removeItem(
            ADMIN_KEY
          );

          sessionStorage.removeItem(
            LOGIN_TIME_KEY
          );
        }
      }
    } catch (error) {
      console.error(
        "Admin session restore failed:",
        error
      );

      sessionStorage.removeItem(
        TOKEN_KEY
      );

      sessionStorage.removeItem(
        ADMIN_KEY
      );

      sessionStorage.removeItem(
        LOGIN_TIME_KEY
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /*
   * Admin Login
   */
  const login = useCallback(
    async (
      mobile: string,
      password: string
    ) => {
      const supabaseUrl =
        import.meta.env
          .VITE_SUPABASE_URL;

      const anonKey =
        import.meta.env
          .VITE_SUPABASE_ANON_KEY;

      if (
        !supabaseUrl ||
        !anonKey
      ) {
        throw new Error(
          "Supabase configuration is missing"
        );
      }

      const cleanMobile =
        mobile.trim();

      if (!cleanMobile) {
        throw new Error(
          "Please enter mobile number"
        );
      }

      if (!password) {
        throw new Error(
          "Please enter password"
        );
      }

      const url =
        `${supabaseUrl}/functions/v1/admin-login`;

      console.log(
        "Calling admin-login..."
      );

      try {
        const response =
          await fetch(url, {
            method: "POST",

            headers: {
  "Content-Type": "application/json",
},

            body: JSON.stringify({
              mobile:
                cleanMobile,

              // Do NOT trim passwords
              password:
                password,
            }),
          });

        /*
         * Safely read response.
         */
        const responseText =
          await response.text();

        let data: any = {};

        try {
          data =
            responseText
              ? JSON.parse(
                  responseText
                )
              : {};
        } catch {
          throw new Error(
            responseText ||
              `Login request failed (${response.status})`
          );
        }

        console.log(
          "Admin Login Status:",
          response.status
        );

        console.log(
          "Admin Login Response:",
          data
        );

        if (
          !response.ok ||
          data.success === false
        ) {
          throw new Error(
            data.error ||
              data.message ||
              "Login failed"
          );
        }

        if (
          !data.token ||
          !data.admin
        ) {
          throw new Error(
            "Invalid login response from server"
          );
        }

        /*
         * Save authenticated session
         */
        sessionStorage.setItem(
          TOKEN_KEY,
          data.token
        );

        sessionStorage.setItem(
          ADMIN_KEY,
          JSON.stringify(
            data.admin
          )
        );

        sessionStorage.setItem(
          LOGIN_TIME_KEY,
          Date.now().toString()
        );

        setAdmin(data.admin);

        return data.admin;
      } catch (error) {
        console.error(
          "Admin login error:",
          error
        );

        throw error;
      }
    },
    []
  );

  /*
   * Admin Logout
   */
  const logout = useCallback(
    () => {
      sessionStorage.removeItem(
        TOKEN_KEY
      );

      sessionStorage.removeItem(
        ADMIN_KEY
      );

      sessionStorage.removeItem(
        LOGIN_TIME_KEY
      );

      setAdmin(null);
    },
    []
  );

  return {
    admin,
    loading,
    login,
    logout,
  };
}