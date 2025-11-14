"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto bg-[#1a1a1a] p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <p className="mb-4">
          Welcome to Velocity News. By accessing or using this website, you
          agree to the following Terms of Service. If you do not agree with
          these terms, please discontinue use of the site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the Website</h2>
        <p className="mb-4">
          You may use Velocity News for personal and non-commercial purposes.
          You agree not to misuse or disrupt the platform in any way.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. User-Generated Content</h2>
        <p className="mb-4">
          By submitting content (including posts, comments, or media) you grant
          Velocity News a non-exclusive, worldwide license to display and store
          that content.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Notifications</h2>
        <p className="mb-4">
          By allowing notifications, you consent to receiving updates when new
          posts are published. You may disable notifications at any time through
          your browser settings.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
        <p className="mb-4">
          Velocity News may display third-party ads (such as Google AdSense).
          These services may use cookies or tracking technologies as described
          in our Privacy Policy.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Limitation of Liability</h2>
        <p className="mb-4">
          Velocity News is provided “as is” without warranties of any kind. We
          are not responsible for damages arising from the use of this website.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to These Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. Continued use of the site
          after updates means you agree to the updated Terms.
        </p>

        <p className="mt-8 opacity-70 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
