'use client'

import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 p-8 cyber-card"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Admin access only
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={() => signIn('github', { callbackUrl: '/admin/blog' })}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Sign in with GitHub
          </button>
        </div>
      </motion.div>
    </div>
  )
} 