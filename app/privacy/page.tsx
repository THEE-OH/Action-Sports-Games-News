"use client";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center px-4 py-10">
      
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8">Velocity News</h1>

      {/* Card */}
      <div className="w-full max-w-3xl bg-[#1E1E1E] p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-6">Privacy Policy</h2>

        <p className="text-gray-300 mb-4">
          Your privacy is important to us. This Privacy Policy explains how Velocity News
          collects, uses, and protects your information.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h3>
        <p className="text-gray-300 mb-4">
          We may collect non-personal information such as browser type, device type, and 
          general usage data. If you choose to follow a game or enable notifications, a 
          browser-generated push notification token may be stored.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">2. Push Notifications</h3>
        <p className="text-gray-300 mb-4">
          If you enable notifications, we store only the minimum required data to send 
          you updates. You can disable notifications at any time in your browser settings.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">3. Cookies</h3>
        <p className="text-gray-300 mb-4">
          We may use basic cookies to enhance site performance. These cookies contain no
          personal identifying information.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h3>
        <p className="text-gray-300 mb-4">
          If we run advertisements (such as Google AdSense), those services may use their 
          own cookies or tracking technologies to serve relevant ads.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h3>
        <p className="text-gray-300 mb-4">
          We take reasonable measures to protect the information stored in our systems.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">6. Changes to This Policy</h3>
        <p className="text-gray-300 mb-4">
          We may update this Privacy Policy from time to time. Any changes will be posted 
          on this page.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">7. Contact</h3>
        <p className="text-gray-300">
          If you have questions about this Privacy Policy, contact me at:  
          <br />
          <span className="text-white">theojudemoss@gmail.com</span>
        </p>
      </div>
    </div>
  );
}
