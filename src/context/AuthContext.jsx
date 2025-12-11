import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('Failed to read auth storage', error);
    return null;
  }
}

function writeStorage(key, value) {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.warn('Failed to write auth storage', error);
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readStorage('auth_token'));
  const [user, setUser] = useState(() => readStorage('auth_user'));

  const login = ({ token: nextToken, user: nextUser }) => {
    setToken(nextToken);
    setUser(nextUser);
    writeStorage('auth_token', nextToken);
    writeStorage('auth_user', nextUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    writeStorage('auth_token', null);
    writeStorage('auth_user', null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
