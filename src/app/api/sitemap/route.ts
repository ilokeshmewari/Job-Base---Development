import { NextResponse } from "next/server";

const SITE_URL = "https://jobbase.site"; // Replace with your actual domain
const WP_API_URL = "https://jobbase.codeews.site/wp-json/wp/v2/posts"; // Replace with your actual WP API endpoint

// Define a type for WordPress job posts
interface JobPost {
  slug: string;
  modified: string;
}

export async function GET() {
  try {
    // Fetch job posts from WP API
    const res = await fetch(WP_API_URL);

    if (!res.ok) {
      throw new Error(`Failed to fetch jobs: ${res.statusText}`);
    }

    const jobs: JobPost[] = await res.json();

    // Generate job detail URLs dynamically
    const jobUrls = jobs
      .map(
        (job) => `
      <url>
        <loc>${SITE_URL}/job-description/${job.slug}</loc>
        <lastmod>${new Date(job.modified).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
      )
      .join("");

    // Construct full sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${SITE_URL}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${jobUrls}
    </urlset>`;

    // Return XML response
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Failed to generate sitemap", { status: 500 });
  }
}
