'use client'   // <-- Add this at the very top

import { supabase } from "../../lib/supabaseClient"

export default function TestPage() {
  async function fetchPosts() {
    const { data, error } = await supabase.from("posts").select("*")
    if (error) {
      alert(`Error: ${error.message}`)
      console.error(error)
    } else {
      alert(`Fetched ${data?.length} posts`)
      console.log(data)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Test</h1>
      <button
        className="px-4 py-2 bg-black text-white rounded"
        onClick={fetchPosts}
      >
        Fetch Posts
      </button>
    </div>
  )
}
