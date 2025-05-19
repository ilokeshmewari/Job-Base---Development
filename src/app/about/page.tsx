// app/about/page.tsx

import React from 'react';

export const metadata = {
  title: "About - Jobbase Community",
  description:
    "Learn about JobBase, your trusted job portal. Join the JobBase community at jobbase.site to explore job openings, internships, and career advice tailored for your growth.",
  keywords: [
    "jobbase",
    "jobbase.site",
    "jobbase community",
    "job portal",
    "career platform",
    "find jobs online",
    "jobbase about",
    "job search India"
  ],
  openGraph: {
    title: "About JobBase Community | jobbase.site",
    description:
      "Discover how JobBase connects job seekers with top opportunities. Join our community and take the next step toward your dream job.",
    url: "https://jobbase.site/about",
    type: "website",
    siteName: "JobBase",
    images: [
      {
        url: "https://jobbase.site/jobbase.png",
        width: 1200,
        height: 630,
        alt: "JobBase Community - jobbase.site",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About JobBase Community | jobbase.site",
    description:
      "Explore the mission and values of JobBase — a job portal built to connect you with verified career opportunities.",
    images: ["https://jobbase.site/jobbase.png"],
  },
};

const About = () => {
  return (
    <div className="h-auto flex flex-col items-center">
      <div className="max-w-4xl w-full p-2">
        <h1 className="text-xl sm:text-3xl font-bold text-left mb-6 text-purple-600">About JobBase Community</h1>
        <p className="text-sm sm:text-lg text-gray-700 mb-4">
          Welcome to jobbase.site, the official home of the JobBase community — your trusted platform for the latest job updates, hiring news,
          internships, and career opportunities across various industries. Our mission at JobBase is to connect job seekers with the right opportunities
          by providing accurate and timely employment-related information.
        </p>
        <p className="text-sm sm:text-lg text-gray-700 mb-4">
          The JobBase community is dedicated to:
        </p>
        <ul className="list-disc list-inside text-sm sm:text-lg text-gray-700 mb-6 space-y-2">
          <li>Delivering verified and up-to-date job openings from reputable companies through jobbase.site.</li>
          <li>Sharing internship opportunities to help students and graduates build their careers via JobBase.</li>
          <li>Providing career guidance, industry trends, and updates from the JobBase community to support decision-making.</li>
          <li>Ensuring authenticity and transparency in every job listing featured on jobbase.site.</li>
        </ul>
        <p className="text-sm sm:text-lg text-gray-700 mb-4">
          We understand how important it is to find the right job at the right time. JobBase is committed to helping you succeed at every stage of your career,
          whether you're a fresher starting out or a professional seeking a new challenge.
        </p>
        <p className="text-sm sm:text-lg text-gray-700 mb-6">
          Stay connected with jobbase.site and be part of the growing JobBase community. Let us help you take that next step toward your dream job.
        </p>
        <p className="text-sm sm:text-lg text-gray-700 text-left">
          For any inquiries, feedback, or collaborations, you can reach the JobBase team at <a href="mailto:info@jobbase.site" className="text-blue-500 underline">info@jobbase.site</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
