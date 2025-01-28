'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

type BlogPost = {
  id: string
  title: string
  content: string
  description: string
  published: boolean
  category: string
  author: string
  createdAt: string
  updatedAt: string
}

export default function AdminBlog() {
  const { status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    description: '',
    published: false,
    category: 'General',
    author: 'Automatrix Team'
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchPosts()
    }
  }, [status, router])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to fetch posts')
      }

      setPosts(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch posts')
      setLoading(false)
      setPosts([]) // Set empty array on error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    try {
      const url = editingId ? '/api/blog' : '/api/blog'
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { ...formData, id: editingId } : formData

      console.log('Submitting form data:', body)

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))

      const text = await response.text()
      console.log('Response text:', text)

      let data
      try {
        data = JSON.parse(text)
      } catch (e) {
        console.error('Error parsing JSON:', e)
        throw new Error('Server returned invalid JSON')
      }

      console.log('Parsed response:', data)

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to save post')
      }

      await fetchPosts()
      setFormData({
        title: '',
        content: '',
        description: '',
        published: false,
        category: 'General',
        author: 'Automatrix Team'
      })
      setEditingId(null)
    } catch (error) {
      console.error('Error saving post:', error)
      setError(error instanceof Error ? error.message : 'Failed to save post')
    }
  }

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      description: post.description,
      published: post.published,
      category: post.category,
      author: post.author
    })
    setEditingId(post.id)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch('/api/blog', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error('Failed to delete post')

      await fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  if (status === 'loading' || loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (status === 'unauthenticated') {
    return <div className="text-center py-12">Access denied. Please sign in.</div>
  }

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-8"
        >
          Blog Post Management
        </motion.h1>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6 mb-12"
        >
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-0 bg-gray-800 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-0 bg-gray-800 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300">
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={8}
              className="mt-1 block w-full rounded-md border-0 bg-gray-800 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-0 bg-gray-800 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-300">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="mt-1 block w-full rounded-md border-0 bg-gray-800 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-violet-500"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-violet-600 focus:ring-violet-500"
            />
            <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-300">
              Published
            </label>
          </div>

          <button
            type="submit"
            className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            {editingId ? 'Update Post' : 'Create Post'}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold text-white">Posts</h2>
          <div className="grid gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg bg-gray-800 p-6 shadow-sm ring-1 ring-gray-700"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">{post.title}</h3>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-sm text-violet-400 hover:text-violet-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-300">
                  Status: {post.published ? 'Published' : 'Draft'}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Category: {post.category}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Author: {post.author}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Created: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 