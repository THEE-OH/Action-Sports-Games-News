import { supabase } from "../lib/supabaseClient";

export default async function Home() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="min-h-screen p-8 text-red-600">Error loading posts: {error.message}</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-zinc-50 dark:bg-black font-sans">
      <h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-white">
        Action Sports News
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-zinc-700 dark:text-zinc-300">No posts yet.</p>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 bg-white dark:bg-gray-900 shadow"
            >
              <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
                {post.title}
              </h2>
              {post.game && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Game: {post.game}
                </p>
              )}
              <p className="text-zinc-700 dark:text-zinc-300">{post.content}</p>
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="mt-2 rounded w-full"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
