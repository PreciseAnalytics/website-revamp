import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  recoveryEmail?: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (fields: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
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

  function updateUser(fields: Partial<AuthUser>) {
    setUser(prev => {
      if (!prev) return prev;
      const next = { ...prev, ...fields };
      localStorage.setItem('pa_user', JSON.stringify(next));
      return next;
    });
  }

  return <AuthContext.Provider value={{ user, login, logout, updateUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
