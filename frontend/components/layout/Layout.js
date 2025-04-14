import React from 'react';
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ title = 'Job-Koi-Job-Chai : Find Your Desire Job Right Now!', children }) => {
  return (
    <div>
      <Head>
        <title>{title} - Job-Koi-Job-Chai</title>
      </Head>

      <Header />
        {children}
      <Footer />
    </div>
  );
};

export default Layout;
