import React from 'react';

const About = () => {
  return (
    <div className="h-auto flex flex-col items-center bg-gray-50">
      <div className="max-w-4xl w-full p-2">
        <h1 className="text-4xl font-bold text-left mb-6 text-purple-600">About Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to <span className="font-semibold">jobbase.site</span>, your trusted platform for the latest job updates, hiring news,
          internships, and career opportunities across various industries. Our mission is to bridge the gap between job seekers and recruiters by
          providing timely and accurate employment-related information.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          At JobBase.site, we strive to:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2">
          <li>Deliver verified and up-to-date job openings from reputable companies.</li>
          <li>Share internship opportunities to help students and fresh graduates gain valuable experience.</li>
          <li>Provide career guidance and industry insights to assist professionals in making informed decisions.</li>
          <li>Ensure transparency and authenticity in all job postings.</li>
        </ul>
        <p className="text-lg text-gray-700 mb-4">
          We understand the importance of finding the right job at the right time, and we are committed to helping you stay ahead in your career journey.
          Whether you are a fresher looking for your first opportunity or an experienced professional seeking growth, jobbase.site is here to support your aspirations.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Stay updated with us and take the next step towards your dream job!
        </p>
        <p className="text-lg text-gray-700 text-left">
          For any inquiries or collaborations, feel free to contact us at <a href="mailto:jobbase02@gmail.com" className="text-blue-500 underline">info@jobbase.site</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
