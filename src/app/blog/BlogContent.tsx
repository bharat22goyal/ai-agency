'use client'

import { useState, useEffect, Suspense } from 'react'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

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

const POSTS_PER_PAGE = 5

function LoadingCard() {
  return (
    <div className="cyber-card mb-6 p-6 animate-pulse">
      <div className="flex items-center gap-x-4 text-xs mb-4">
        <div className="h-4 w-24 bg-gray-700 rounded"></div>
        <div className="h-4 w-16 bg-violet-500/10 rounded-full"></div>
      </div>
      <div className="h-6 w-3/4 bg-gray-700 rounded mb-2"></div>
      <div className="h-4 w-full bg-gray-700 rounded mb-4"></div>
      <div className="flex items-center gap-x-4">
        <div className="h-8 w-8 rounded-full bg-violet-500/10"></div>
        <div className="h-4 w-24 bg-gray-700 rounded"></div>
      </div>
    </div>
  )
}

function BlogPosts({ posts, onPostClick }: { posts: BlogPost[], onPostClick: (post: BlogPost) => void }) {
  return (
    <>
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="cyber-card mb-6 p-6 cursor-pointer hover:bg-gray-800/50 transition-colors"
          onClick={() => onPostClick(post)}
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
            </div>
          </div>
        </motion.article>
      ))}
    </>
  )
}

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
      const response = await fetch('/api/blog', {
        next: { revalidate: 60 } // Cache for 60 seconds
      })
      const data = await response.json()
      
      if (!response.ok) {
        const errorMessage = data?.error || data?.message || 'Failed to fetch posts'
        throw new Error(errorMessage)
      }
      
      const publishedPosts = Array.isArray(data) ? data.filter(post => post.published) : []
      setPosts(publishedPosts)
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
              Latest Insights in AI
            </h2>
          </motion.div>
          
          <div className="mx-auto mt-16 max-w-3xl">
            <Suspense fallback={
              <>
                {[...Array(3)].map((_, i) => (
                  <LoadingCard key={i} />
                ))}
              </>
            }>
              {loading ? (
                <>
                  {[...Array(3)].map((_, i) => (
                    <LoadingCard key={i} />
                  ))}
                </>
              ) : error ? (
                <div className="text-center text-red-400">
                  <p>Error: {error}</p>
                  <button
                    onClick={() => fetchPosts()}
                    className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-500"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <BlogPosts posts={paginatedPosts} onPostClick={setSelectedPost} />
                  
                  {/* Pagination */}
                  {posts.length > 0 && (
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
                  )}
                </>
              )}
            </Suspense>
          </div>
        </div>
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedPost(null)}
            />
            
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
                    <h2 className="text-2xl font-bold text-white mb-4">{selectedPost.title}</h2>
                    
                    <div className="flex items-center gap-x-4 mb-8">
                      <div className="h-10 w-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-violet-400">
                          {selectedPost.author[0]}
                        </span>
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-white">{selectedPost.author}</p>
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