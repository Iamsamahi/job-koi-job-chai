import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, login, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  // Format error message by removing JSON artifacts
  const formatError = (errorMsg) => {
    if (!errorMsg) return '';
    
    // If error is in JSON format or has special characters
    if (typeof errorMsg === 'string') {
      // Check if it's in JSON-like format
      if (errorMsg.startsWith('[') || errorMsg.startsWith('{')) {
        try {
          const parsed = JSON.parse(errorMsg.replace(/'/g, '"'));
          return parsed.error || errorMsg;
        } catch {
          // If parsing fails, clean up the string manually
          return errorMsg
            .replace(/^\["|"\]$|^\{"|"\}$/g, '')
            .replace(/^error:"|"error:"/, '')
            .replace(/\\"/g, '"');
        }
      }
    }
    
    return errorMsg;
  };

  useEffect(() => {
    if (error) {
      // Format the error message before displaying the toast
      const formattedError = formatError(error);
      toast.error(formattedError);
    }

    if (isAuthenticated && !loading) {
      router.push('/'); // Redirect to home page
    }
  }, [error, loading, isAuthenticated]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await login({ username: email, password });
    // Redirection is handled in the login function or useEffect
  };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image src="/images/login.svg" alt="login" layout="fill" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2>LOGIN</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    title="Please enter a valid email address"
                    required
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="loginButtonWrapper">
                <button type="submit" className="loginButton" disabled={loading}>
                  {loading ? 'Authenticating...' : 'Login'}
                </button>
              </div>
              <p style={{ textDecoration: 'none' }} className="signup">
                New to Job Koi Job Chai? <Link href="/register">Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;