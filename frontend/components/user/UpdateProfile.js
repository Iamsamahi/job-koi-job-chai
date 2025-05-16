// components/user/UpdateProfile.js
import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Link from 'next/link';

const UpdateProfile = ({ access_token }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updated, loading, user, error, updateProfile, setUpdated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (updated) {
      toast.success('Profile updated successfully!');
      setUpdated(false);
      // Optional: router.push('/myself/profile');
    }
  }, [updated, setUpdated, router]);

  useEffect(() => {
    if (error && !loading) {
      toast.error(error);
    }
  }, [error, loading]);

  const validateInputs = () => {
    if (!firstName.trim()) return 'First name is required';
    if (!lastName.trim()) return 'Last name is required';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Invalid email format';
    return null;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const success = await updateProfile({ firstName, lastName, email, password }, access_token);
    if (!success && !loading) {
      toast.error(error || 'Profile update failed');
    }
  };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image src="/images/profile.svg" alt="Profile" layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2>Update Profile</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i className="fas fa-user" />
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="inputBox">
                  <i className="fas fa-user-tie" />
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="inputBox">
                  <i className="fas fa-envelope" />
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="inputBox">
                  <i className="fas fa-key" />
                  <input
                    type="password"
                    placeholder="Enter New Password (optional)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="registerButtonWrapper">
                <button
                  type="submit"
                  className="registerButton"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
              <p className="login">
                View your profile? <Link href="/myself/profile">Go to Profile</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;