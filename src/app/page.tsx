"use client";
import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import PopupForm from "@/components/PopUpForm";

export default function HomePage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<any[]>([]); // ✅ Displayed jobs state
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); // ✅ Initially show 6 posts

  useEffect(() => {
    if (!sessionStorage.getItem("popupShown")) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("popupShown", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const wpRes = await fetch(
          "https://tuts.codeews.site/wp-json/wp/v2/posts?_embed"
        );
        const wpJobs = await wpRes.json();

        let formattedJobs = wpJobs.map((job: any) => ({
          id: job.id,
          title: job.title.rendered,
          slug: job.slug,
          posted_date: job.date,
          deadline: job.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ""),
          featured_image:
            job._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/default-job.png",
        }));

        formattedJobs.sort((a: { posted_date: string | number | Date; }, b: { posted_date: string | number | Date; }) => {
          const dateA = new Date(a.posted_date);
          const dateB = new Date(b.posted_date);
          return sortOrder === "newest"
            ? dateB.getTime() - dateA.getTime()
            : dateA.getTime() - dateB.getTime();
        });

        formattedJobs = formattedJobs.slice(0, 50); // ✅ Show only the latest 50 posts

        setJobs(formattedJobs);
        setFilteredJobs(formattedJobs);
        setDisplayedJobs(formattedJobs.slice(0, 6)); // ✅ Show first 6 initially
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
    setDisplayedJobs(filtered.slice(0, visibleCount)); // ✅ Update displayed jobs based on search
  }, [searchQuery, jobs, visibleCount]);

  // ✅ Handle "Show More" button
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // ✅ Handle "Show Less" button (Reset to initial 6)
  const handleShowLess = () => {
    setVisibleCount(6);
  };

  return (
    <div className="relative">
      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}

      {/* Search & Filter */}
      <div className="flex justify-between items-center p-4 border-b">
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
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {displayedJobs.length > 0 ? (
          displayedJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-center text-gray-500">No jobs found.</p>
        )}
      </div>

      {/* Show More / Show Less Buttons */}
      <div className="flex justify-center mt-4">
        {visibleCount < filteredJobs.length && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}

        {visibleCount > 6 && visibleCount >= filteredJobs.length && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}
