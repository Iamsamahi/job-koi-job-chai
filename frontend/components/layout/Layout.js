import React from 'react';
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ title = 'Job-koi-job-chai : Find Your Desire Job Right Now!', children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />    
      </Head>

      <Header />
        {children}
      <Footer />
    </div>
  );
};

export default Layout;
