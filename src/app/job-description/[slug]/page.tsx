"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PopUpForm from "@/components/PopUpForm";

interface Job {
  title: string;
  content: string;
}

export default function JobDescriptionPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string | undefined;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    async function fetchJob() {
      if (!slug) return;

      try {
        const res = await fetch(
          `https://jobbase.codeews.site/wp-json/wp/v2/posts?slug=${slug}`
        );
        const data: any[] = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
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
        console.error("Error fetching job details:", err);
        setError("Error fetching job details");
        setLoading(false);
      }
    }

    fetchJob();
  }, [slug]);

  useEffect(() => {
    const popupShown = sessionStorage.getItem("popupShown");

    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("popupShown", "true");
      }, 3000); // Show popup after 3 seconds

      return () => clearTimeout(timer);
    }
  }, []);

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
      {/* ✅ Show Popup Form */}
      {showPopup && <PopUpForm onClose={() => setShowPopup(false)} />} 

      {/* ✅ Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-10 px-4 sm:px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center text-gray-700 transition"
      >
        ← Back to Jobs
      </button>

      {/* ✅ Job Title */}
      <h1
        className="text-3xl sm:text-5xl tracking-wide font-bold text-gray-900 mb-4 text-left"
        dangerouslySetInnerHTML={{ __html: job?.title || "" }}
      ></h1>

      {/* ✅ Divider */}
      <hr className="border-gray-300 mb-6" />
      <div data-banner-id="295943"></div>

      {/* ✅ Formatted WP Content */}
      <div
        className="wp-content prose max-w-full text-gray-800 leading-relaxed text-sm sm:text-base"
        dangerouslySetInnerHTML={{ __html: job?.content || "" }}
      />
    </div>
  );
}
