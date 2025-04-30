// app/blogs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogPost {
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

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch blog posts related to Category ID 7 (Blog)
  useEffect(() => {
    setLoading(true);
    fetch('https://jobbase.codeews.site/wp-json/wp/v2/posts?_embed&per_page=30&categories=7')  // Filter by category ID 7
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  // Helper function to clean HTML excerpt
  const getPlainExcerpt = (html: string, limit = 80) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const decoded = tempElement.textContent || tempElement.innerText || '';
    const cleanText = decoded.trim().replace(/[.…\s]*$/, ''); // remove trailing symbols
    return cleanText.length > limit ? cleanText.slice(0, limit) + '...' : cleanText;
  };

  return (
    <section className="min-h-screen px-1 py-3 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">All Blog Posts</h2>

      {loading ? (
        <div className="text-center text-lg text-gray-600 py-12">Loading posts...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden border shadow-sm flex flex-col h-full"
            >
              <div className="h-40 bg-gray-100">
                {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                  <img
                    src={post._embedded['wp:featuredmedia'][0].source_url}
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
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                ></h3>
                <div className="text-sm text-gray-500 mb-2 line-clamp-1">
                  {post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized'} · {`Job Base`}
                </div>
                <p className="text-gray-600 mb-4">{getPlainExcerpt(post.excerpt.rendered)}</p>
                <div className="mt-auto">
                  <button
                    onClick={() => router.push(`/blogs/read/${post.slug}`)}
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-700"
                  >
                    Read More
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
