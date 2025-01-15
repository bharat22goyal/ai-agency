'use client'

import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

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

const POSTS_PER_PAGE = 5

export default function BlogContent() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedPost])

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

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

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
          
          <div className="mx-auto mt-16 max-w-3xl">
            {paginatedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="cyber-card mb-6 p-6 cursor-pointer hover:bg-gray-800/50 transition-colors"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex items-center gap-x-4 text-xs mb-4">
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

                <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{post.description}</p>

                <div className="flex items-center gap-x-4">
                  <div className="h-8 w-8 rounded-full bg-violet-500/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-violet-400">
                      {post.author[0]}
                    </span>
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-white">{post.author}</p>
                    {post.authorRole && (
                      <p className="text-gray-400">{post.authorRole}</p>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-violet-500/10 text-violet-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <span className="flex items-center px-4 text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-violet-500/10 text-violet-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Updated Blog Post Popup */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedPost(null)}
            />
            
            {/* Scrollable Content */}
            <div className="relative h-full overflow-y-auto">
              <div className="min-h-full p-4 flex items-start justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  className="relative w-full max-w-4xl my-8 bg-gray-900 rounded-lg shadow-xl"
                >
                  {/* Fixed Header */}
                  <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-gray-900 border-b border-gray-800 rounded-t-lg">
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={new Date(selectedPost.createdAt).toISOString()} className="text-gray-400">
                        {new Date(selectedPost.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="inline-flex items-center rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
                        {selectedPost.category}
                      </span>
                      {selectedPost.readingTime && (
                        <span className="text-gray-400">{selectedPost.readingTime}</span>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:bg-gray-800"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Scrollable Content */}
                  <div className="p-6">
                    {selectedPost.image && (
                      <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
                        <img
                          src={selectedPost.image}
                          alt={selectedPost.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}

                    <h2 className="text-2xl font-bold text-white mb-4">{selectedPost.title}</h2>
                    
                    <div className="flex items-center gap-x-4 mb-8">
                      <div className="h-10 w-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-violet-400">
                          {selectedPost.author[0]}
                        </span>
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-white">{selectedPost.author}</p>
                        {selectedPost.authorRole && (
                          <p className="text-gray-400">{selectedPost.authorRole}</p>
                        )}
                      </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                      <div className="text-gray-300 whitespace-pre-line">
                        {selectedPost.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  )
} 