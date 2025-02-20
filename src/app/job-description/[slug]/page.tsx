"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function JobDescriptionPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(
          `https://jobbase.codeews.site/wp-json/wp/v2/posts?slug=${slug}`
        );
        const data = await res.json();

        if (data.length === 0) {
          setError("Job not found");
          setLoading(false);
          return;
        }

        const jobData = data[0];
        setJob({
          title: jobData.title.rendered,
          content: jobData.content.rendered, // ✅ WP API HTML Content
        });

        setLoading(false);
      } catch (err) {
        setError("Error fetching job details");
        setLoading(false);
      }
    }

    if (slug) {
      fetchJob();
    }
  }, [slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <p className="text-gray-500 text-lg text-center">Loading job details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <p className="text-red-500 text-lg text-center">{error}</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-white shadow-lg rounded-lg">
      {/* ✅ Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-10 px-4 sm:px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center text-gray-700 transition"
      >
        ← Back to Jobs
      </button>

      {/* ✅ Job Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-left ">
        {job.title}
      </h1>

      {/* ✅ Divider */}
      <hr className="border-gray-300 mb-6" />

      {/* ✅ Formatted WP Content */}
      <div
        className="wp-content prose max-w-full text-gray-800 leading-relaxed text-sm sm:text-base"
        dangerouslySetInnerHTML={{ __html: job.content }}
      />

      {/* ✅ Apply Now Button */}
      <div className="mt-8 flex justify-center sm:justify-start">
        <button className="px-5 sm:px-6 py-3 bg-green-600 text-white text-sm sm:text-lg font-semibold rounded-lg shadow hover:bg-green-700 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
}
