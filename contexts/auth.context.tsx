import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pa_user');
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  function login(u: AuthUser) {
    localStorage.setItem('pa_user', JSON.stringify(u));
    setUser(u);
  }

  function logout() {
    localStorage.removeItem('pa_user');
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
