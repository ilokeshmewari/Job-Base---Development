"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import JobCard from "@/components/JobCard";
import PopupForm from "@/components/PopUpForm";
import MakeYouCode from "@/components/MakeYouCode";
import SessionPopup from "@/components/PopUpForm"; // Import popup component

export default function HomePage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [user, setUser] = useState<any>(null);
  const [showSessionPopup, setShowSessionPopup] = useState(false);

  // ✅ Check if user is logged in
  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    }
    checkUser();
  }, []);

  // ✅ Google One Tap Authentication
  useEffect(() => {
    if (!user && typeof window !== "undefined") {
      const googleClientId = "YOUR_GOOGLE_CLIENT_ID";

      window.google?.accounts.id.initialize({
        client_id: googleClientId,
        callback: async (response: { credential: string }) => {
          const { credential } = response;
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: credential,
          });

          if (data?.user) setUser(data.user);
          if (error) console.error("Google Sign-in Error:", error);
        },
        auto_select: true,
        cancel_on_tap_outside: false,
      });

      window.google?.accounts.id.prompt();
    }
  }, [user]);

  // ✅ Fetch jobs from WP API
  useEffect(() => {
    async function fetchJobs() {
      try {
        const wpRes = await fetch(
          "https://jobbase.codeews.site/wp-json/wp/v2/posts?_embed"
        );
        const wpJobs = await wpRes.json();

        let formattedJobs = wpJobs.map((job: any) => ({
          id: job.id,
          title: job.title.rendered,
          slug: job.slug,
          posted_date: job.date,
          deadline: job.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ""),
          featured_image:
            job._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default-job.png",
        }));

        formattedJobs.sort((a: any, b: any) => {
          const dateA = new Date(a.posted_date);
          const dateB = new Date(b.posted_date);
          return sortOrder === "newest"
            ? dateB.getTime() - dateA.getTime()
            : dateA.getTime() - dateB.getTime();
        });

        formattedJobs = formattedJobs.slice(0, 50);
        setJobs(formattedJobs);
        setFilteredJobs(formattedJobs);
        setDisplayedJobs(formattedJobs.slice(0, visibleCount));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    fetchJobs();
  }, [sortOrder]);

  // ✅ Search & Filter Jobs
  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
    setDisplayedJobs(filtered.slice(0, visibleCount));
  }, [searchQuery, jobs, visibleCount]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleShowLess = () => {
    setVisibleCount(6);
  };

  // ✅ Show session popup once per session
  useEffect(() => {
    const popupShown = sessionStorage.getItem("popupShown");

    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowSessionPopup(true);
        sessionStorage.setItem("popupShown", "true");
      }, 5000); // Show popup after 5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative">
      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}
      {showSessionPopup && <SessionPopup onClose={() => setShowSessionPopup(false)} />} 

      {/* ✅ Navbar */}
      <div className="flex justify-between items-center py-4 px-1 lg:px-4 border-b">
        <input
          type="text"
          placeholder="Search jobs..."
          className="p-2 border rounded w-2/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* <div className="bg-slate-400 p-2">Search</div> */}

        {/* Pending Work */}
        <select
          className="p-2 border rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="flex gap-4 mt-4">
        {/* Job Listings */}
        <div className="w-full lg:w-[70%] lg:ml-4 flex flex-col gap-3 cursor-pointer">
          {displayedJobs.length > 0 ? (
            displayedJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-center text-gray-500">No jobs found.</p>
          )}
        </div>

        {/* Sidebar Ads (Visible only on desktop) */}
        <div className="hidden lg:block w-[30%] bg-slate-200 h-[400px] sticky top-5 border border-gray-300 rounded-md">
          <MakeYouCode />
        </div>
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

        {visibleCount > 6 && (
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
