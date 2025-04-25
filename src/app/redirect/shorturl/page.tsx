'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

export default function ShortUrlRedirect() {
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setPublicUrl(null);

    const slug = generateSlug(title);

    if (!slug || !url.startsWith('http')) {
      setMessage('Please enter a valid job title and URL.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('redirects').insert([{ slug, url }]);

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
    } else {
      const generatedUrl = `https://jobbase.site/post/${slug}`;
      setPublicUrl(generatedUrl);
      setMessage('✅ Redirect created successfully!');
      setTitle('');
      setUrl('');
    }

    setLoading(false);
  };

  const handleCopy = async () => {
    if (publicUrl) {
      await navigator.clipboard.writeText(publicUrl);
      setMessage('🔗 URL copied to clipboard!');
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-2xl shadow-sm p-6 my-8 mt-10 max-w-md mx-auto text-left">
      <h1 className="text-2xl font-bold mb-6 text-center text-purple-600">Create a Job Redirect</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            type="text"
            placeholder="e.g., Infosys is hiring Backend Interns"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Original URL</label>
          <input
            type="url"
            placeholder="https://xyz.com/job/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 text-white font-medium py-2 rounded transition"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Redirect'}
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center ${message.startsWith('✅') || message.startsWith('🔗') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      {publicUrl && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">Public Link:</p>
          <div className="flex items-center justify-center mt-2 space-x-2">
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {publicUrl}
            </a>
            <button
              onClick={handleCopy}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded border"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
