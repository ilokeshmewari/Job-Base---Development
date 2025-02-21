"use client";
import { useState } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Import Supabase client

export default function PopupForm({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("job_alert_subscribers")
      .select("email")
      .eq("email", formData.email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking existing user:", checkError.message);
      setLoading(false);
      return;
    }

    if (existingUser) {
      setAlreadyExists(true);
      setSubmitted(true);
      setLoading(false);
      return;
    }

    // Insert new user if not already exists
    const { error } = await supabase.from("job_alert_subscribers").insert([
      {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
      },
    ]);

    if (error) {
      console.error("Error submitting data:", error.message);
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              📢 Stay Updated!
            </h2>
            <p className="text-center text-gray-600 text-sm">
              Subscribe for the latest job openings.
            </p>

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              required
              className="border p-3 rounded-md focus:ring focus:ring-blue-300"
              value={formData.full_name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="border p-3 rounded-md focus:ring focus:ring-blue-300"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="border p-3 rounded-md focus:ring focus:ring-blue-300"
              value={formData.phone}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Subscribe"}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p
              className={`text-lg font-semibold ${
                alreadyExists ? "text-orange-500" : "text-green-600"
              }`}
            >
              {alreadyExists
                ? "You're already subscribed! 🎉"
                : "You're now subscribed! ✅"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {alreadyExists
                ? "You will continue receiving job alerts."
                : "You will be informed about new job openings first."}
            </p>

            {/* Social Buttons */}
            <div className="mt-4 flex justify-center space-x-4">
              <a
                href="https://chat.whatsapp.com/BwtD5g3OzW18JD8ZFW5M6X" // Replace with your WhatsApp channel link
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                <MessageCircle size={20} className="mr-2" />
                Join WhatsApp
              </a>
              <a
                href="https://t.me/jobbase_25" // Replace with your Telegram channel link
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                <Send size={20} className="mr-2" />
                Join Telegram
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
