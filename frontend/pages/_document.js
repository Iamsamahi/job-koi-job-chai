import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script'
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
     strategy="beforeInteractive"
     src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        ></Script>

<Script
  src="https://kit.fontawesome.com/9edb65c86a.js"
  crossOrigin="anonymous"
></Script>

<Script
  strategy="beforeInteractive"
  src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
></Script>

<Script
  strategy="beforeInteractive"
  src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
></Script>
      </body>
    </Html>
  );
}

