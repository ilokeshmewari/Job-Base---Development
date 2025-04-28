import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="max-w-4xl w-full p-2">
        <h1 className="text-4xl font-bold text-left mb-6 text-purple-600">Contact</h1>

        <p className="text-lg text-gray-700 mb-4">
          For any inquiries, suggestions, or support, feel free to reach out to us:
        </p>

        <p className="text-lg text-gray-700 mb-6">
          Email: <a href="mailto:jobbase02@gmail.com" className="text-blue-500 underline">info@jobbase.site</a>
        </p>

        <p className="text-lg text-gray-700">
          We at <span className="font-semibold">jobbase.site</span> are a platform dedicated to providing the latest job updates, hiring news, internships, and career opportunities.
          Stay connected with us for reliable job-related information.
        </p>
      </div>
    </div>
  );
};

export default Contact;
