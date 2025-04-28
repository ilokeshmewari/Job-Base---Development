import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full p-2">
        <h1 className="text-lg sm:text-3xl font-bold text-left mb-6 text-purple-600">Terms of Service</h1>

        <h2 className="text-md sm:text-xl font-semibold text-gray-800 mb-4">1. General Disclaimer</h2>
        <p className="text-sm sm:text-lg text-gray-700 mb-6">
          <span className="font-semibold">jobbase.site</span> is an independent job information platform providing updates on job openings, internships, and career opportunities.
          We are not affiliated with any company, recruiter, agency, or employer whose postings appear on our platform. All logos, trademarks, and brand names belong to their respective owners.
          Users are advised to verify all job details directly on official company websites before applying.
        </p>

        <h2 className="text-md sm:text-xl font-semibold text-gray-800 mb-4">2. No Guarantee or Warranty</h2>
        <p className="text-sm sm:text-lg text-gray-700 mb-6">
          jobbase.in does not guarantee responses from employers or assure job placements.
          We do not verify or endorse the credentials of job providers, recruiters, or third-party organizations.
          We are not liable for any incorrect, outdated, or misleading information from external sources.
        </p>

        <h2 className="text-md sm:text-xl font-semibold text-gray-800 mb-4">3. Limitation of Liability</h2>
        <p className="text-sm sm:text-lg text-gray-700 mb-6">
          We are not responsible for any loss of data, technical failures, or service interruptions due to system errors, hacking attempts, or force majeure events.
          We are also not liable for any direct, indirect, incidental, or consequential damages arising from the use of our platform.
        </p>

        <h2 className="text-md sm:text-xl font-semibold text-gray-800 mb-4">4. User Responsibilities</h2>
        <p className="text-sm sm:text-lg text-gray-700 mb-6">
          By accessing jobbase.in, users agree that they are legally capable of using our services, will not misuse the platform for fraudulent activities, and will not resell or redistribute content without permission.
        </p>

        <h2 className="text-md sm:text-xl font-semibold text-gray-800 mb-4">5. Termination of Services</h2>
        <p className="text-sm sm:text-lg text-gray-700 mb-6">
          We reserve the right to terminate user access if users violate our terms, engage in unethical activities, or upon subscription/service expiration or discontinuation.
        </p>

        <h2 className="text-md sm:text-xl font-semibold text-gray-800 mb-4">6. Beware of Fraud and Scams</h2>
        <p className="text-sm sm:text-lg text-gray-700 mb-6">
          We strongly advise users to stay alert against phishing and spoofing scams. jobbase.in never asks for payments from job seekers or requests personal details via email.
          Always verify job listings on official company websites and avoid offers demanding registration fees or sensitive information.
        </p>

        <h2 className="text-md sm:text-xl font-semibold text-gray-800 mb-4">7. Changes to Terms</h2>
        <p className="text-sm sm:text-lg text-gray-700 mb-6">
          jobbase.in reserves the right to update or modify these Terms of Service at any time. Users are encouraged to review this page periodically to stay informed.
        </p>

        <h2 className="text-md sm:text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
        <p className="text-sm sm:text-lg text-gray-700">
          For any concerns or inquiries, please contact us at <a href="mailto:jobbase02@gmail.com" className="text-blue-500 underline">info@jobbase.site</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
