'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Authentication Error</h1>
          <p className="text-gray-300 mb-6">
            {error === 'AccessDenied' 
              ? 'You are not authorized to access this page. Please contact the administrator.'
              : 'An error occurred during authentication. Please try again.'}
          </p>
          <a
            href="/auth/signin"
            className="inline-block bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-500 transition-colors"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ErrorContent />
    </Suspense>
  )
} 