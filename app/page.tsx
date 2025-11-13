"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { formatDistanceToNow } from "date-fns";

interface Post {
  id: string;
  title: string;
  content: string;
  game: string;
  image_url: string;
  created_at: string;
}

export default function ViewerPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Request browser notification permission
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // Fetch initial posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from<Post>("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPosts(data);
  };

  // Real-time subscription for new posts
  useEffect(() => {
    const subscription = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          const newPost = payload.new as Post;
          setPosts((prev) => [newPost, ...prev]);

          if (Notification.permission === "granted") {
            new Notification(`New post: ${newPost.title}`, {
              body: newPost.content,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-white px-6 py-4 rounded-lg shadow-md mb-8 text-center sm:text-left bg-gray-800">
        Velocity News
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-lg md:text-xl font-bold text-white">
                {post.title}
              </h2>
              {post.created_at && (
                <span className="text-gray-400 text-xs md:text-sm">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </span>
              )}
            </div>
            <p className="mt-2 text-gray-300 text-sm md:text-base">{post.content}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="mt-4 w-full h-48 object-cover rounded-lg"
              />
            )}
            <p className="mt-2 text-gray-400 text-xs">Game: {post.game}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
