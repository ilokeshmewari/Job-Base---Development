// app/see-all-jobs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface JobPost {
  id: number;
  title: { rendered: string };
  slug: string;
  excerpt: { rendered: string }; 
  categories: number[];
  date: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string }[];
    'wp:term'?: { name: string; id: number }[][];
  };
}

interface Category {
  id: number;
  name: string;
}

export default function SeeAllJobsPage() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch('https://jobbase.codeews.site/wp-json/wp/v2/posts?_embed&per_page=30')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setFilteredJobs(data);
        setLoading(false);
      });

    fetch('https://jobbase.codeews.site/wp-json/wp/v2/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredJobs(jobs.filter(job => job.categories.includes(selectedCategory)));
    } else {
      setFilteredJobs(jobs);
    }
  }, [selectedCategory, jobs]);

  const getPlainExcerpt = (html: string, limit = 80) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const decoded = tempElement.textContent || tempElement.innerText || '';
    const cleanText = decoded.trim().replace(/[.…\s]*$/, ''); // remove trailing symbols
    return cleanText.length > limit ? cleanText.slice(0, limit) + '...' : cleanText;
  };
  

  return (
    <section className="min-h-screen px-1 py-3 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">All Job Listings</h2>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-md border ${selectedCategory === null ? 'bg-black text-white' : 'bg-white'}`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-md border ${selectedCategory === cat.id ? 'bg-black text-white' : 'bg-white'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-lg text-gray-600 py-12">Loading jobs...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <div
              key={job.id}
              className="bg-white rounded-xl overflow-hidden border shadow-sm flex flex-col h-full"
            >
              <div className="h-40 bg-gray-100">
                {job._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                  <img
                    src={job._embedded['wp:featuredmedia'][0].source_url}
                    alt="Featured"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3
                  className="text-xl font-semibold mb-1 line-clamp-1"
                  dangerouslySetInnerHTML={{ __html: job.title.rendered }}
                ></h3>
                <div className="text-sm text-gray-500 mb-2 line-clamp-1">
                  {job._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized'} · {`Job Base`}
                </div>
                <p className="text-gray-600 mb-4">{getPlainExcerpt(job.excerpt.rendered)}</p>
                <div className="mt-auto">
                  <button
                    onClick={() => router.push(`/job-description/${job.slug}`)}
                    className="w-full bg-black text-white py-2 rounded-md hover:from-purple-600 hover:to-purple-800 transition"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}