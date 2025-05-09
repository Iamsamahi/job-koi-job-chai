import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Link from 'next/link';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, isAuthenticated, register } = useContext(AuthContext);
  const router = useRouter();

  // Format error message
  const formatError = (errorMsg) => {
    if (!errorMsg) return '';
    if (typeof errorMsg === 'string') {
      if (errorMsg.startsWith('[') || errorMsg.startsWith('{')) {
        try {
          const parsed = JSON.parse(errorMsg.replace(/'/g, '"'));
          return parsed.error || errorMsg;
        } catch {
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
    console.log('Register page mounted', { isAuthenticated, loading, error }); // Debug log
    if (error) {
      const formattedError = formatError(error);
      toast.error(formattedError);
    }
    // Only redirect if authenticated and not loading
    if (isAuthenticated && !loading) {
      console.log('Redirecting to homepage');
      router.push('/');
    }
  }, [error, isAuthenticated, loading, router]);

  const validateInputs = () => {
    if (!firstName.trim()) return 'First name is required';
    if (!lastName.trim()) return 'Last name is required';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Invalid email format';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      toast.error(validationError);
      return;
    }
    console.log('Submitting registration with:', { firstName, lastName, email, password });
    const success = await register({ firstName, lastName, email, password });
    if (success) {
      toast.success('Registration successful! Please log in.');
    }
  };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image src="/images/signup.svg" alt="Sign up" layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2>SIGN UP</h2>
            </div>
        
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden="true" className="fas fa-user" title="First Name"></i>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    aria-label="First Name"
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden="true" className="fas fa-user-tie" title="Last Name"></i>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    aria-label="Last Name"
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden="true" className="fas fa-envelope" title="Email"></i>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email"
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden="true" className="fas fa-key" title="Password"></i>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-label="Password"
                  />
                </div>
              </div>
              <div className="registerButtonWrapper">
                <button
                  type="submit"
                  className="registerButton"
                  disabled={loading}
                  aria-label={loading ? 'Registering...' : 'Register'}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
              <p style={{ textDecoration: 'none' }} className="login">
                Already with Job Koi Job Chai? <Link href="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;