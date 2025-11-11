"use client"; // must be client component for interactivity
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

interface Post {
  id: number;
  title: string;
  content: string;
  game?: string;
  image_url?: string;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [game, setGame] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  // Fetch posts
  const fetchPosts = async () => {
    const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (error) setMessage(`Error fetching posts: ${error.message}`);
    else setPosts(data as Post[]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add new post
  const addPost = async () => {
    if (!title || !content) {
      setMessage("Title and content are required.");
      return;
    }

    const { error } = await supabase.from("posts").insert([{ title, content, game, image_url: imageUrl }]);
    if (error) setMessage(`Error adding post: ${error.message}`);
    else {
      setMessage("Post added!");
      setTitle("");
      setContent("");
      setGame("");
      setImageUrl("");
      fetchPosts();
    }
  };

  // Delete post
  const deletePost = async (id: number) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) setMessage(`Error deleting post: ${error.message}`);
    else fetchPosts();
  };

  // Update post
  const updatePost = async (id: number) => {
    const { error } = await supabase
      .from("posts")
      .update({ title, content, game, image_url: imageUrl })
      .eq("id", id);

    if (error) setMessage(`Error updating post: ${error.message}`);
    else {
      setMessage("Post updated!");
      setTitle("");
      setContent("");
      setGame("");
      setImageUrl("");
      fetchPosts();
    }
  };

  return (
    <div className="min-h-screen p-8 bg-zinc-50 dark:bg-black font-sans">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Admin Panel</h1>

      {/* Add / Edit Post Form */}
      <div className="space-y-4 max-w-lg mb-8">
        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Game (optional)"
          value={game}
          onChange={(e) => setGame(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={addPost}
        >
          Add Post
        </button>
        {message && <p className="mt-2 text-zinc-700 dark:text-zinc-300">{message}</p>}
      </div>

      {/* Existing Posts List */}
      <div className="space-y-4 max-w-3xl">
        {posts.length === 0 ? (
          <p className="text-zinc-700 dark:text-zinc-300">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 bg-white dark:bg-gray-900 shadow">
              <h2 className="text-xl font-semibold mb-1 text-black dark:text-white">{post.title}</h2>
              {post.game && <p className="text-sm text-zinc-600 dark:text-zinc-400">Game: {post.game}</p>}
              <p className="text-zinc-700 dark:text-zinc-300">{post.content}</p>
              {post.image_url && <img src={post.image_url} alt={post.title} className="mt-2 rounded w-full" />}
              <div className="mt-2 flex gap-2">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => {
                    setTitle(post.title);
                    setContent(post.content);
                    setGame(post.game || "");
                    setImageUrl(post.image_url || "");
                  }}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
