'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 p-8 cyber-card"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Authentication Error
          </h2>
          <p className="mt-2 text-center text-sm text-red-400">
            {error === 'AccessDenied' 
              ? 'You are not authorized to access this page.'
              : 'There was an error signing in.'}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <Link
            href="/auth/signin"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Try Again
          </Link>
        </div>
      </motion.div>
    </div>
  )
} 