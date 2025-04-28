import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="p-4 text-center text-gray-600 bg-gray-50">
      {/* Upper Section: Links */}
      <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm text-gray-800">
        <Link href="/about" className="hover:text-gray-600">About</Link>
        <Link href="/contact" className="hover:text-gray-600">Contact</Link>
        <Link href="/privacy-policy" className="hover:text-gray-600">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-gray-600">Terms</Link>
        <Link href="/sitemap" className="hover:text-gray-600">Sitemap</Link>
      </div>

      {/* Divider line */}
      <hr className="my-4 border-gray-300" />

      {/* Original Footer Section */}
      <div className="text-gray-600">
        © {new Date().getFullYear()} Job Base Powered by <a href="https://codeews.site" className="decoration-none text-gray-600 hover:text-gray-800">CodeEra Web Studio</a>. All rights reserved.
      </div>
    </footer>
  );
}
