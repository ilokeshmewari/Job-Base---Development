"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface JobView {
  slug: string;
  views: number;
  clicks: number;
  title?: string; // Added for fetched title
}

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<JobView[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalViews, setTotalViews] = useState<number>(0);
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchJobViews();
  }, [currentPage]);

  const fetchJobViews = async () => {
    const { data, error } = await supabase
      .from("job_views")
      .select("*")
      .order("views", { ascending: false }) // Most viewed first
      .limit(10);

    if (error) {
      console.error("Error fetching jobs:", error);
      return;
    }

    let viewsSum = 0;
    let clicksSum = 0;

    const updatedJobs: JobView[] = await Promise.all(
      data.map(async (job) => {
        viewsSum += job.views;
        clicksSum += job.clicks;

        const title = await fetchJobTitle(job.slug);
        return { ...job, title };
      })
    );

    setJobs(updatedJobs);
    setTotalViews(viewsSum);
    setTotalClicks(clicksSum);
  };

  const fetchJobTitle = async (slug: string): Promise<string> => {
    try {
      const response = await fetch(`https://jobbase.codeews.site/wp-json/wp/v2/posts?slug=${slug}`);
      const posts = await response.json();
      return posts.length > 0 ? posts[0].title.rendered : "Unknown Title";
    } catch (error) {
      console.error("Error fetching title:", error);
      return "Unknown Title";
    }
  };

  const paginatedJobs = jobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen">
      {/* Top Summary Bar */}
      <div className="bg-blue-500 text-white p-4 rounded-lg flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <h2 className="text-lg md:text-xl font-bold">Total Views: {totalViews}</h2>
        <h2 className="text-lg md:text-xl font-bold mt-2 md:mt-0">Total Clicks: {totalClicks}</h2>
      </div>

      {/* Job Table */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center md:text-left">Top Viewed Jobs</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-3 border text-left">Title</th>
                <th className="py-2 px-3 border text-center">Views</th>
                <th className="py-2 px-3 border text-center">Clicks</th>
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-3 border">{job.title}</td>
                    <td className="py-2 px-3 border text-center">{job.views}</td>
                    <td className="py-2 px-3 border text-center">{Math.max(job.clicks - job.views, 0)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    No jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 rounded bg-blue-500 text-white transition duration-300 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <button
            onClick={() => setCurrentPage((prev) => (prev * itemsPerPage < jobs.length ? prev + 1 : prev))}
            className={`px-4 py-2 rounded bg-blue-500 text-white transition duration-300 ${
              currentPage * itemsPerPage >= jobs.length ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={currentPage * itemsPerPage >= jobs.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
