"use client";

import "./globals.css";
import { useEffect, useState, ReactNode } from "react";
import Script from "next/script";

// Props type
type RootLayoutProps = {
  children: ReactNode;
};

// Cookie consent banner
function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) setShow(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm text-white p-4 flex justify-between items-center z-50">
      <p className="text-sm max-w-[70%]">
        This site uses cookies for analytics and notifications. By continuing to
        use the site, you accept our Privacy Policy.
      </p>
      <button
        onClick={acceptCookies}
        className="ml-4 bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md text-sm font-semibold"
      >
        Accept
      </button>
    </div>
  );
}

// Root layout
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Verification */}
        <meta
          name="google-adsense-account"
          content="ca-pub-4597958293743642"
        />

        {/* Google AdSense Script (latest recommended format) */}
        <Script
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4597958293743642"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-[#121212] text-white relative">
        {children}

        {/* Responsive bottom ad placeholder */}
        <div className="fixed bottom-0 left-0 w-full flex justify-center z-40 p-1 bg-gray-900">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-slot="1234567890" // replace with your Ad unit ID later
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <Script>
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </Script>
        </div>

        <CookieBanner />
      </body>
    </html>
  );
}
