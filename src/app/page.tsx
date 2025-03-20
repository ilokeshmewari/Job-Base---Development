"use client";
import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import MakeYouCode from "@/components/MakeYouCode";

type Job = {
  id: number;
  title: string;
  slug: string;
  posted_date: string;
  deadline: string;
  featured_image: string;
};

type WPJob = {
  id: number;
  title: { rendered: string };
  slug: string;
  date: string;
  excerpt: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: { source_url?: string }[];
  };
};

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const jobsPerPage = 10;

  useEffect(() => {
    async function fetchJobs() {
      try {
        const wpRes = await fetch(
          "https://jobbase.codeews.site/wp-json/wp/v2/posts?_embed&per_page=100"
        );
        const wpJobs: WPJob[] = await wpRes.json();

        const formattedJobs: Job[] = wpJobs.map((job) => ({
          id: job.id,
          title: job.title.rendered,
          slug: job.slug,
          posted_date: job.date,
          deadline: job.excerpt.rendered,
          featured_image:
            job._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default-job.png",
        }));

        setJobs(formattedJobs);
        setFilteredJobs(formattedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchQuery, jobs]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center py-4 px-1 lg:px-4 border-b">
        <input
          type="text"
          placeholder="Search jobs..."
          className="p-2 border rounded w-2/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mt-4">
        <div className="w-full lg:w-[70%] lg:ml-4 flex flex-col gap-3 cursor-pointer">
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-center text-gray-500">No jobs found.</p>
          )}
        </div>

        <div className="hidden lg:block w-[30%] bg-slate-200 h-[400px] sticky top-5 border border-gray-300 rounded-md">
          <MakeYouCode />
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}