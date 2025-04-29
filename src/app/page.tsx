// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Hero from '@/components/Hero';

interface JobPost {
  id: number;
  title: { rendered: string };
  slug: string;
  excerpt: { rendered: string }; // ✅ Add this
  categories: number[];
  date: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string }[];
    'wp:term'?: { name: string }[][];
  };
}

export default function LandingPage() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [search, setSearch] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<JobPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('https://jobbase.codeews.site/wp-json/wp/v2/posts?_embed&per_page=6')
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setFilteredJobs(
        jobs.filter(job =>
          job.title.rendered.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredJobs([]);
    }
  }, [search, jobs]);

  const getPlainExcerpt = (html: string, limit = 80) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const decoded = tempElement.textContent || tempElement.innerText || '';
    const cleanText = decoded.trim().replace(/[.…\s]*$/, ''); // remove trailing dots or ellipsis
  
    return cleanText.length > limit ? cleanText.slice(0, limit) + '...' : cleanText;
  };

  return (
    <>
      <Hero />
      <section className="px-1 py-4 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl mb-2 sm:text-3xl font-bold sm:mb-4 md:mb-0">Latest Job Opportunities</h2>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search jobs..."
                className="border px-4 py-2 rounded-md w-full"
              />
              {filteredJobs.length > 0 && (
                <ul className="absolute left-0 mt-2 w-full bg-white border rounded shadow z-10">
                  {filteredJobs.map(job => (
                    <li
                      key={job.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                    >
                      <Link href={`/job-description/${job.slug}`}>
                        <span dangerouslySetInnerHTML={{ __html: job.title.rendered }}></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              href="/see-all-jobs"
              className="px-4 py-2 border rounded-md font-medium hover:bg-gray-100 whitespace-nowrap w-full sm:w-auto text-center"
            >
              See All Jobs
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.slice(0, 6).map(job => (
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
                <h3 className="text-md sm:text-md font-semibold mb-1 line-clamp-1">
                  {job.title.rendered}
                </h3>

                <div className="text-sm text-gray-500 mb-2 line-clamp-1">
                  {job._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized'} ·{' '}
                  {`Job base`}
                </div>
                <p className="text-gray-600 mb-4">{getPlainExcerpt(job.excerpt.rendered)}</p>
                <div className="mt-auto">
                  <button
                    onClick={() => router.push(`/job-description/${job.slug}`)}
                    className="w-full  bg-black cursor-pointer text-white py-2 rounded-md"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
