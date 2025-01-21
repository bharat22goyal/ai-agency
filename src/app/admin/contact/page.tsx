'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { TrashIcon } from '@heroicons/react/24/outline'

type ContactSubmission = {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
  status: string
}

export default function AdminContact() {
  const { status } = useSession()
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSubmissions()
    }
  }, [status])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/contact')
      if (!response.ok) throw new Error('Failed to fetch submissions')
      const data = await response.json()
      setSubmissions(data)
      setError(null)
    } catch (error) {
      console.error('Error fetching submissions:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch submissions')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return

    setDeleting(id)
    try {
      const response = await fetch('/api/contact', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error('Failed to delete submission')
      
      setSubmissions(submissions.filter(sub => sub.id !== id))
    } catch (error) {
      console.error('Error deleting submission:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete submission')
    } finally {
      setDeleting(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
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
          Contact Submissions
        </motion.h1>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {submissions.map((submission) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{submission.name}</h3>
                  <p className="text-gray-400">{submission.email}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-violet-400/10 text-violet-400">
                    {submission.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(submission.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap">{submission.message}</p>
              
              <button
                onClick={() => handleDelete(submission.id)}
                disabled={deleting === submission.id}
                className={`absolute top-4 right-4 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity
                  ${deleting === submission.id 
                    ? 'bg-red-500/20 cursor-not-allowed' 
                    : 'bg-red-500/10 hover:bg-red-500/20'}`}
              >
                <TrashIcon className="w-5 h-5 text-red-400" />
              </button>
            </motion.div>
          ))}

          {submissions.length === 0 && !error && (
            <div className="text-center py-12 text-gray-400">
              No submissions yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 