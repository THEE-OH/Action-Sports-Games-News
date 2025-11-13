"use client";

import { useState, useEffect } from "react";
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
    const { data } = await supabase
      .from<"posts", Post>("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPosts(data);
  };

  useEffect(() => {
    fetchPosts();

    // Register service worker for notifications
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => {
        console.log("Service Worker registered");
      });
    }

    // Request notification permission
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    // Polling for new posts every 10 seconds
    const interval = setInterval(async () => {
      const { data } = await supabase
        .from<"posts", Post>("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) {
        if (data.length > posts.length) {
          const newPosts = data.slice(0, data.length - posts.length);
          newPosts.forEach((post) => {
            new Notification("New Post: " + post.title, {
              body: post.content,
            });
          });
        }
        setPosts(data);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="text-center py-8 text-4xl font-bold">Velocity News</header>
      <main className="max-w-3xl mx-auto p-4 flex flex-col gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-white">{post.title}</h2>
              <span className="text-gray-400 text-sm">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </span>
            </div>
            <p className="text-gray-200 mt-2">{post.content}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="mt-2 max-w-full rounded-md"
              />
            )}
            <p className="text-gray-400 mt-1 text-sm">Game: {post.game}</p>
          </div>
        ))}
        {posts.length === 0 && <p className="text-gray-400 text-center">No posts yet.</p>}
      </main>
    </div>
  );
}
