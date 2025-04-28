import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full p-2">
        <h1 className="text-4xl font-bold text-left mb-6 text-purple-600">Privacy Policy</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to <span className="font-semibold">jobbase.site</span>. Our website provides job updates, hiring news, internships, and career opportunities.
          Your privacy is important to us, and this policy outlines how we collect, use, and protect your information.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Data We Collect and Why</h2>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">Comments</h3>
        <p className="text-lg text-gray-700 mb-4">
          When visitors leave comments on jobbase.in, we collect the data shown in the comment form, the visitor’s IP address, and browser user agent to help prevent spam.
          An anonymized string (hash) of your email address may be shared with the Gravatar service to check if you have a profile. Once your comment is approved,
          your profile picture becomes publicly visible.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">Media</h3>
        <p className="text-lg text-gray-700 mb-4">
          If you upload images, avoid adding embedded location data (EXIF GPS), as visitors may download and extract location details from uploaded images.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">Cookies</h3>
        <p className="text-lg text-gray-700 mb-4">
          We use cookies to enhance user experience. These include:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2">
          <li>Comment Cookies: Save your name, email, and website when you leave a comment. These cookies last for one year.</li>
          <li>Login Cookies: Temporary cookies check if your browser accepts cookies and additional cookies save login information.</li>
          <li>Editing/Publishing Cookies: A cookie stores the post ID when editing or publishing articles, expiring after one day.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">Embedded Content from Other Websites</h3>
        <p className="text-lg text-gray-700 mb-6">
          Articles on jobbase.in may include embedded content (e.g., videos, images, articles) from other websites. These sites may collect data, use cookies, and monitor your interaction with the embedded content.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Share Your Data With</h2>
        <p className="text-lg text-gray-700 mb-6">
          If you request a password reset, your IP address will be included in the reset email. We do not sell or share your personal data with third parties for marketing purposes.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Retention</h2>
        <p className="text-lg text-gray-700 mb-6">
          Comments and their metadata are retained indefinitely to improve moderation and spam detection.
          Registered users (if any) can see, edit, or delete their personal information, except for their username.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights Over Your Data</h2>
        <p className="text-lg text-gray-700 mb-6">
          If you have an account or have left comments, you can request an exported file of your personal data stored on our platform
          or request data deletion, except where retention is required for legal, administrative, or security purposes.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Where Your Data is Sent</h2>
        <p className="text-lg text-gray-700 mb-6">
          Visitor comments may be checked through an automated spam detection service to maintain platform integrity.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
        <p className="text-lg text-gray-700">
          For privacy-related inquiries, please contact us at <a href="mailto:jobbase02@gmail.com" className="text-blue-500 underline">info@jobbase.site</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
