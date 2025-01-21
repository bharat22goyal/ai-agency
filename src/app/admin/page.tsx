'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { DocumentTextIcon, ChatBubbleLeftIcon, CpuChipIcon } from '@heroicons/react/24/outline'

export default function AdminPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="text-center py-12">Loading...</div>
  }

  if (status === 'unauthenticated') {
    return <div className="text-center py-12">Access denied. Please sign in.</div>
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-8"
        >
          Admin Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/blog">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <DocumentTextIcon className="w-8 h-8 text-violet-400 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Blog Management</h2>
              <p className="text-gray-400">Create, edit, and manage your blog posts</p>
            </motion.div>
          </Link>

          <Link href="/admin/services">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <CpuChipIcon className="w-8 h-8 text-violet-400 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Services Management</h2>
              <p className="text-gray-400">Create, edit, and manage your services</p>
            </motion.div>
          </Link>

          <Link href="/admin/contact">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <ChatBubbleLeftIcon className="w-8 h-8 text-violet-400 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Contact Management</h2>
              <p className="text-gray-400">View and manage contact form submissions</p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  )
} 