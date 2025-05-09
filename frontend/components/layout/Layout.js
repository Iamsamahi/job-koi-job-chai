// components/layout/Layout.js
import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ title = 'Job-Koi-Job-Chai : Find Your Desire Job Right Now!', children }) => {
  return (
    <div>
      <Head>
        <title>{`${title} - Job-Koi-Job-Chai`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;