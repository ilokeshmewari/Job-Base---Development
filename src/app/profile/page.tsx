"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        setUser({ email: user.email || '' });
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {user ? (
        <h1 className="text-2xl font-bold">
          Welcome, <span className="text-blue-600">{user.email}</span>
        </h1>
      ) : (
        <p className="text-gray-500">Loading user data...</p>
      )}
    </div>
  );
}
