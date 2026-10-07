import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, fetchCurrentUser } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('toplap_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('toplap_token') || null;
  });

  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function verifySession() {
      if (token) {
        try {
          const res = await fetchCurrentUser(token);
          if (res.user) {
            setUser(res.user);
            localStorage.setItem('toplap_user', JSON.stringify(res.user));
          }
        } catch {
          // Token expired or invalid
          setUser(null);
          setToken(null);
          localStorage.removeItem('toplap_token');
          localStorage.removeItem('toplap_user');
        }
      }
      setLoading(false);
    }
    verifySession();
  }, [token]);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('toplap_token', data.token);
    localStorage.setItem('toplap_user', JSON.stringify(data.user));
    showToast(`⚡ Welcome back, <strong>${data.user.name}</strong>!`);
    return data.user;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('toplap_token', data.token);
    localStorage.setItem('toplap_user', JSON.stringify(data.user));
    showToast(`🎉 Account created! Welcome to TopLap, <strong>${data.user.name}</strong>.`);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('toplap_token');
    localStorage.removeItem('toplap_user');
    showToast('Signed out successfully.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
