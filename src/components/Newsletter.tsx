"use client";

import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { CheckCircle } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Submit");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email) return;

    setStatus("Submitting...");

    try {
      const { error } = await supabase.from("newsletters").insert([{ email }]);

      if (error) throw error;

      setStatus("Submitted");
      setEmail("");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        setStatus("Submit");
      }, 3000);
    } catch (error) {
      console.error("Error submitting email:", error);
      setStatus("Submit");
    }
  };

  return (
    <>
      {/* Toast Alert (Moved Outside Section) */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-white border border-green-200 shadow-lg rounded-lg w-[90%] max-w-sm z-50 flex items-start p-4 pr-5 overflow-hidden animate-fadeInUp">
          {/* Left Green Strip */}
          <div className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-l-lg" />

          {/* Icon & Content */}
          <div className="flex items-start gap-3 pl-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <p className="font-semibold text-sm text-gray-900">Success</p>
              <p className="text-sm text-gray-600">You{`'`}ve successfully subscribed to the newsletter.</p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowToast(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-[3px] bg-green-500 w-full animate-progressBar" />
        </div>
      )}

      <section className="bg-gray-100 py-12 px-4 mt-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Stay Updated!
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
            Subscribe to our newsletter for the latest insights, updates, and trending stories from the tech world.
          </p>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col sm:flex-row items-center gap-4 sm:gap-6 max-w-2xl"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full flex-1 px-5 py-3 rounded-lg border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 transition disabled:opacity-60"
              disabled={status === "Submitting..."}
            >
              {status}
            </button>
          </form>
        </div>
      </section>

      {/* Custom animations */}
      <style jsx>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-progressBar {
          animation: progressBar 3s linear forwards;
        }

        @keyframes progressBar {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </>
  );
};

export default NewsletterSection;
