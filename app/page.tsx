"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { formatDistanceToNow } from "date-fns";

interface Post {
  id: string;
  title: string;
  content: string;
  game: string;
  image_url?: string;
  created_at: string;
}

export default function ViewerPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from<any, Post>("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Register Service Worker for notifications
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => {
        console.log("Service Worker registered");
      });
    }

    // Load AdSense ads after consent is given
    const loadAds = () => {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {
        console.error("Adsense push error:", e);
      }
    };

    // Check every 1 second if Cookiebot consent has been given
    const interval = setInterval(() => {
      const win = window as any;
      if (win.Cookiebot && win.Cookiebot.consent && win.Cookiebot.consent.given) {
        loadAds();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-6">
      {/* Header */}
      <header className="flex flex-col items-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-4">Velocity News</h1>

        {/* Privacy/Terms Buttons */}
        <div className="flex gap-4">
          <a
            href="/privacy"
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition"
          >
            Terms of Service
          </a>
        </div>
      </header>

      {/* Posts */}
      <main className="flex flex-col gap-6 mb-16">
        {posts.length === 0 && <p className="text-gray-400">No posts yet.</p>}

        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md relative"
          >
            {/* Timestamp */}
            <span className="absolute top-2 right-4 text-gray-400 text-sm">
              {post.created_at
                ? formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                  })
                : ""}
            </span>

            <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
            <p className="text-gray-200 mb-2">{post.content}</p>
            <p className="text-gray-400 text-sm mb-2">Game: {post.game}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="max-w-full rounded mb-2"
              />
            )}
          </div>
        ))}
      </main>

      {/* Bottom ad placeholder */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center z-40 p-1 bg-gray-900">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-slot="1234567890" // replace with your actual Ad unit ID later
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}
