'use client'

import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

type BlogPost = {
  id: string
  title: string
  content: string
  description: string
  slug: string
  image?: string
  published: boolean
  category: string
  author: string
  authorRole?: string
  readingTime?: string
  createdAt: string
  updatedAt: string
}

export default function BlogContent() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      const data = await response.json()
      
      if (!response.ok) {
        const errorMessage = data?.error || data?.message || 'Failed to fetch posts'
        throw new Error(errorMessage)
      }
      
      setPosts(Array.isArray(data) ? data : [])
      setError(null)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch posts')
      setPosts([])
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="relative isolate pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative isolate pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center text-red-400">
            <p>Error: {error}</p>
            <button
              onClick={() => fetchPosts()}
              className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative isolate pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Latest Insights in AI and Testing
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-300">
              Expert perspectives on modern testing practices, AI-powered automation, and quality assurance strategies.
            </p>
          </motion.div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="cyber-card flex flex-col"
              >
                {post.image && (
                  <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={new Date(post.createdAt).toISOString()} className="text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span className="inline-flex items-center rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
                    {post.category}
                  </span>
                  {post.readingTime && (
                    <span className="text-gray-400">{post.readingTime}</span>
                  )}
                </div>
                <div className="group relative mt-4">
                  <h3 className="text-lg font-semibold leading-6 text-white">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-gray-300">
                    {post.description}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="h-10 w-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-violet-400">
                      {post.author[0]}
                    </span>
                  </div>
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-white">
                      {post.author}
                    </p>
                    {post.authorRole && (
                      <p className="text-gray-400">{post.authorRole}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  {expandedPost === post.id ? 'Show Less' : 'Read More'}
                </button>
                {expandedPost === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 text-sm leading-6 text-gray-300 whitespace-pre-line"
                  >
                    {post.content}
                  </motion.div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 