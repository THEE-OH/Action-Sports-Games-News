'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [game, setGame] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [posts, setPosts] = useState<any[]>([])
  const [editingPostId, setEditingPostId] = useState<number | null>(null)

  // Fetch posts
  async function fetchPosts() {
    const { data, error } = await supabase.from('posts').select('*').order('id', { ascending: false })
    if (error) console.error('Error fetching posts:', error)
    else setPosts(data)
  }

  // Add new post
  async function addPost() {
    const { error } = await supabase.from('posts').insert([
      { title, content, game, image_url: imageUrl }
    ])
    if (error) alert(`Error: ${error.message}`)
    else {
      alert('Post added successfully!')
      setTitle(''); setContent(''); setGame(''); setImageUrl('')
      fetchPosts()
    }
  }

  // Delete a post
  async function deletePost(id: number) {
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) alert(`Error: ${error.message}`)
    else fetchPosts()
  }

  // Start editing a post
  function startEdit(post: any) {
    setEditingPostId(post.id)
    setTitle(post.title)
    setContent(post.content)
    setGame(post.game)
    setImageUrl(post.image_url)
  }

  // Save edits
  async function saveEdit() {
    if (!editingPostId) return
    const { error } = await supabase.from('posts').update({
      title, content, game, image_url: imageUrl
    }).eq('id', editingPostId)
    if (error) alert(`Error: ${error.message}`)
    else {
      alert('Post updated!')
      setEditingPostId(null)
      setTitle(''); setContent(''); setGame(''); setImageUrl('')
      fetchPosts()
    }
  }

  useEffect(() => { fetchPosts() }, [])

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Form */}
      <input className="border p-2 w-full mb-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea className="border p-2 w-full mb-2" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="Game" value={game} onChange={e => setGame(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />

      {editingPostId ? (
        <button className="px-4 py-2 bg-yellow-600 text-white rounded mb-4" onClick={saveEdit}>Save Edit</button>
      ) : (
        <button className="px-4 py-2 bg-black text-white rounded mb-4" onClick={addPost}>Add Post</button>
      )}

      {/* List of posts */}
      <h2 className="text-xl font-bold mt-6 mb-2">Existing Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      <ul>
        {posts.map(post => (
          <li key={post.id} className="border p-2 mb-2">
            <p><strong>Title:</strong> {post.title}</p>
            <p><strong>Content:</strong> {post.content}</p>
            <p><strong>Game:</strong> {post.game}</p>
            {post.image_url && <img src={post.image_url} alt={post.title} className="w-full mt-2 mb-2" />}

            <div className="flex gap-2 mt-2">
              <button className="px-2 py-1 bg-yellow-500 text-white rounded" onClick={() => startEdit(post)}>Edit</button>
              <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
