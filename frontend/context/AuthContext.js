import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get('/api/auth/user');
      console.log('Load user response:', res.data); // Debug log
      if (res.data.user) {
        setIsAuthenticated(true);
        setUser(res.data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      console.error('Load user error:', err.message, err.response?.data); // Debug log
      setError(err.response?.data?.error || err.message || 'Failed to load user');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser(); // Load user on mount
  }, []);

  const login = async ({ username, password }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post('/api/auth/login', { username, password });
      console.log('Login response:', res.data); // Debug log
      if (res.data.success) {
        setIsAuthenticated(true);
        setUser(res.data.user);
        setError(null);
        await loadUser(); // Load user data after login
        return true;
      } else {
        setError('Invalid credentials');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err.message, err.response?.data); // Debug log
      const errorMessage = err.response?.data?.error || err.message || 'Login failed';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/logout');
      if (res.data.success) {
        setIsAuthenticated(false);
        setUser(null);
        setError(null);
        router.push('/login');
      } else {
        setError('Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err.message, err.response?.data); // Debug log
      setError(err.response?.data?.error || err.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ firstName, lastName, email, password }) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Submitting registration to /pages/register', { firstName, lastName, email }); // Debug log
      const res = await axios.post('/api/auth/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      console.log('Register response:', res.data);
      if (res.data.success) {
        setError(null);
        router.push('/login');
        return true;
      } else {
        setError('Registration failed');
        return false;
      }
    } catch (err) {
      console.error('Register error:', err.message, err.response?.data);
      const errorMessage = err.response?.data?.error || err.message || 'Registration failed';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        error,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        loadUser,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;