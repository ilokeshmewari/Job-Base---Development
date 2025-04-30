'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Blog {
  title: string;
  content: string;
  featuredImageUrl: string | null;
}

interface BlogAPIResponse {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number;  // Media ID for the featured image
}

interface MediaAPIResponse {
  source_url: string;  // URL of the featured image
}

export default function BlogDescriptionPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string | undefined;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) return;

      try {
        // Fetch the blog post data
        const res = await fetch(
          `https://jobbase.codeews.site/wp-json/wp/v2/posts?slug=${slug}`
        );
        const data: BlogAPIResponse[] = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          setError("Blog not found");
          setLoading(false);
          return;
        }

        const blogData = data[0];

        // Fetch the featured image URL
        let featuredImageUrl: string | null = null;
        if (blogData.featured_media) {
          const mediaRes = await fetch(
            `https://jobbase.codeews.site/wp-json/wp/v2/media/${blogData.featured_media}`
          );
          const mediaData: MediaAPIResponse = await mediaRes.json();
          featuredImageUrl = mediaData.source_url || null;
        }

        setBlog({
          title: blogData?.title?.rendered || "Untitled",
          content: blogData?.content?.rendered || "No content available.",
          featuredImageUrl,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("Error fetching blog details");
        setLoading(false);
      }
    }

    fetchBlog();
  }, [slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <p className="text-gray-500 text-md text-center">Loading blog details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <p className="text-red-500 text-lg text-center">{error}</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 py-2 sm:py-8 bg-white">
      {/* ✅ Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 sm:px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center text-gray-700 transition"
      >
        ← Back to Blogs
      </button>

      {/* ✅ Featured Image */}
      {blog?.featuredImageUrl && (
        <img
          src={blog.featuredImageUrl}
          alt="Featured Image"
          className="w-full h-auto block sm:hidden mb-6 rounded-lg"
        />
      )}

      {/* ✅ Blog Title */}
      <h1
        className="text-3xl sm:text-5xl tracking-wide font-bold text-gray-900 mb-4 text-left"
        dangerouslySetInnerHTML={{ __html: blog?.title || "" }}
      ></h1>

      {/* ✅ Divider */}
      <hr className="border-gray-300 mb-6" />

      {/* ✅ Formatted WP Content */}
      <div
        className="wp-content prose max-w-full text-gray-800 leading-relaxed text-sm sm:text-base"
        dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
      />
    </div>
  );
}
