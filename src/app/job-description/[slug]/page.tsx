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
          `https://tuts.codeews.site/wp-json/wp/v2/posts?slug=${slug}`
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

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* ✅ Back Button */}
      

      {/* ✅ Job Title */}
      <h1 className="text-2xl font-bold mb-4">{job.title}</h1>

      {/* ✅ Formatted WP Content */}
      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: job.content }}
      />

      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        ← Back
      </button>

    </div>
  );
}
