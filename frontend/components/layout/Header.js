import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { loading, user , logout } = useContext(AuthContext);

  const handleLogout = async () => {
    logout();
  }
  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="30" height="30" src="/frontend/public/images/logo.pngs/logo.png" alt="Logo"/>
            </div>
            <span className="logo1">Job-koi-</span>
            <span className="logo2">job-chai</span>
          </div>
        </Link>

        <div className="btnsWrapper">
          <Link href="/employeer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>

          {user ? (
            <div className="dropdown ml-3">
              <button
                className="btn dropdown-toggle mr-4"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Hi, {user.first_name}</span>
              </button>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link href="/employeer/jobs" className="dropdown-item">
                  My jobs
                </Link>
                <Link href="/myself/applied" className="dropdown-item">
                  Jobs Applied
                </Link>
                <Link href="/myself/profile" className="dropdown-item">
                
                  Profile
                </Link>
                <Link href="/upload/resume" className="dropdown-item">
                  Upload Resume
                </Link>
                <Link href="/" className="dropdown-item text-danger" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
