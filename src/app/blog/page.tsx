'use client'

import BlogContent from './BlogContent'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'

export default function Blog() {
  return (
    <PageTransition>
      <BlogContent />
      <Footer />
    </PageTransition>
  )
} 