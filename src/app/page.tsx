"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import JobCard from "@/components/JobCard";
import PopupForm from "@/components/PopUpForm";
import MakeYouCode from "@/components/MakeYouCode";
import SessionPopup from "@/components/PopUpForm";

type Job = {
  id: number;
  title: string;
  slug: string;
  posted_date: string;
  deadline: string;
  featured_image: string;
};

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [showSessionPopup, setShowSessionPopup] = useState<boolean>(false);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const wpRes = await fetch(
          "https://jobbase.codeews.site/wp-json/wp/v2/posts?_embed"
        );
        const wpJobs: any[] = await wpRes.json();

        const formattedJobs: Job[] = wpJobs.map((job) => ({
          id: job.id,
          title: job.title.rendered,
          slug: job.slug,
          posted_date: job.date,
          deadline: job.excerpt.rendered,
          featured_image:
            job._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default-job.png",
        }));

        formattedJobs.sort((a, b) => {
          const dateA = new Date(a.posted_date).getTime();
          const dateB = new Date(b.posted_date).getTime();
          return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

        setJobs(formattedJobs.slice(0, 50));
        setFilteredJobs(formattedJobs.slice(0, 50));
        setDisplayedJobs(formattedJobs.slice(0, visibleCount));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    fetchJobs();
  }, [sortOrder]);

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
    setDisplayedJobs(filtered.slice(0, visibleCount));
  }, [searchQuery, jobs, visibleCount]);

  useEffect(() => {
    const popupShown = sessionStorage.getItem("popupShown");
    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowSessionPopup(true);
        sessionStorage.setItem("popupShown", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative">
      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />} 
      {showSessionPopup && <SessionPopup onClose={() => setShowSessionPopup(false)} />} 

      <div className="flex justify-between items-center py-4 px-1 lg:px-4 border-b">
        <input
          type="text"
          placeholder="Search jobs..."
          className="p-2 border rounded w-2/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="p-2 border rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="flex gap-4 mt-4">
        <div className="w-full lg:w-[70%] lg:ml-4 flex flex-col gap-3 cursor-pointer">
          {displayedJobs.length > 0 ? (
            displayedJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-center text-gray-500">No jobs found.</p>
          )}
        </div>

        <div className="hidden lg:block w-[30%] bg-slate-200 h-[400px] sticky top-5 border border-gray-300 rounded-md">
          <MakeYouCode />
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {visibleCount < filteredJobs.length && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => setVisibleCount((prev) => prev + 6)}>
            Show More
          </button>
        )}

        {visibleCount > 6 && (
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4" onClick={() => setVisibleCount(6)}>
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}
