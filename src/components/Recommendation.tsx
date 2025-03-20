"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Job {
  slug: string;
  views: number;
  clicks: number;
  title?: string;
  excerpt?: string;
}

export default function Recommendation() {
  const [recommendedJob, setRecommendedJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchTopRecommendedJob();
  }, []);

  const fetchTopRecommendedJob = async () => {
    const { data, error } = await supabase
      .from("job_views")
      .select("*")
      .order("clicks", { ascending: false }) // Sort by clicks first
      .order("views", { ascending: false }) // If clicks are same, sort by views
      .limit(1);

    if (error || !data || data.length === 0) {
      console.error("Error fetching top job:", error);
      return;
    }

    const job = data[0];
    const jobDetails = await fetchJobDetails(job.slug);
    setRecommendedJob({ ...job, ...jobDetails });
  };

  const fetchJobDetails = async (slug: string): Promise<{ title: string; excerpt: string }> => {
    try {
      const response = await fetch(`https://jobbase.codeews.site/wp-json/wp/v2/posts?slug=${slug}`);
      const posts = await response.json();

      if (posts.length > 0) {
        return {
          title: posts[0].title.rendered,
          excerpt: posts[0].excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ""), // Remove HTML tags
        };
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
    }

    return { title: "Unknown Title", excerpt: "No excerpt available." };
  };

  if (!recommendedJob) return null;

  return (
    <div className="bg-gray-200 border-l-4 border-black/60 p-4 rounded-lg shadow-md my-6">
      <h2 className="text-lg font-semibold text-gray-800">
      Most users applying
      </h2>
      <Link href={`/job-description/${recommendedJob.slug}`}>
        <p className="text-blue-600 hover:underline font-bold mt-2">{recommendedJob.title}</p>
      </Link>
      <p className="text-sm text-gray-600 mt-1">{recommendedJob.excerpt}</p>
    </div>
  );
}
