"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient"; // adjust path if needed

interface Post {
  id: string;
  title: string;
  content: string;
  game: string;
  image_url: string;
}

export default function AdminPanel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newGame, setNewGame] = useState("");
  const [newImage, setNewImage] = useState("");

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.error("Fetch error:", error);
    else setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add a new post
  const handleAddPost = async () => {
    if (!newTitle || !newContent) {
      alert("Title and content are required");
      return;
    }
    const { error } = await supabase.from("posts").insert([
      {
        title: newTitle,
        content: newContent,
        game: newGame,
        image_url: newImage,
      },
    ]);
    if (error) console.error("Insert error:", error);
    else {
      setNewTitle("");
      setNewContent("");
      setNewGame("");
      setNewImage("");
      fetchPosts();
    }
  };

  // Delete a post
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) console.error("Delete error:", error);
    else fetchPosts();
  };

  // Update a post
  const handleUpdate = async (post: Post) => {
    const newTitle = prompt("New title:", post.title) || post.title;
    const newContent = prompt("New content:", post.content) || post.content;
    const newGame = prompt("New game:", post.game) || post.game;
    const newImage = prompt("New image URL:", post.image_url) || post.image_url;

    const { error } = await supabase
      .from("posts")
      .update({ title: newTitle, content: newContent, game: newGame, image_url: newImage })
      .eq("id", post.id);
    if (error) console.error("Update error:", error);
    else fetchPosts();
  };

  if (loading) return <div>Loading posts...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Add new post form */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <h2 className="text-xl font-semibold mb-2">Add New Post</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Game"
          value={newGame}
          onChange={(e) => setNewGame(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Image URL"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)} // <-- typing works now
        />

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleAddPost}
        >
          Add Post
        </button>
      </div>

      {/* Existing posts */}
      {posts.map((post) => (
        <div key={post.id} className="mb-4 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mb-1">{post.content}</p>
          <p className="mb-1 text-sm text-gray-500">Game: {post.game}</p>
          {post.image_url && (
            <img src={post.image_url} alt={post.title} className="mb-2 max-w-xs" />
          )}
          <div className="flex gap-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => handleUpdate(post)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
