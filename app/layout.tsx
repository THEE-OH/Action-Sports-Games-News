"use client";

import "./globals.css";
import { useEffect, useState, ReactNode } from "react";

// Define props type for RootLayout
type RootLayoutProps = {
  children: ReactNode;
};

// Cookie consent banner component
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

// Root layout component
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-[#121212] text-white">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
