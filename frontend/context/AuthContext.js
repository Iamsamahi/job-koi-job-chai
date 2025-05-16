import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);
  const router = useRouter();

  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get('/api/auth/user');
      if (res.data.user) {
        setIsAuthenticated(true);
        setUser(res.data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to load user');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async ({ username, password }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post('/api/auth/login', { username, password });
      if (res.data.success) {
        setIsAuthenticated(true);
        setUser(res.data.user);
        setError(null);
        await loadUser();
        return true;
      } else {
        setError('Invalid credentials');
        return false;
      }
    } catch (err) {
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
      setError(err.response?.data?.error || err.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ firstName, lastName, email, password }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post('/api/auth/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      if (res.data.success) {
        router.push('/login');
        return true;
      } else {
        setError('Registration failed');
        return false;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Registration failed';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({ firstName, lastName, email, password }, access_token) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/myself/update/`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password: password || '', // Always include password, default to empty string if undefined
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data) {
        setUser(res.data);
        setUpdated(true);
        return true;
      }
      return false;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Profile update failed';
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
        updated,
        setIsAuthenticated,
        login,
        logout,
        loadUser,
        register,
        setUpdated,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;