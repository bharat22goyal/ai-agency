import { Metadata } from 'next'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'Blog - Latest Insights in AI and Testing | Automatrix',
  description: 'Expert perspectives on modern testing practices, AI-powered automation, and quality assurance strategies from the Automatrix team.',
  keywords: 'AI testing, test automation, quality assurance, software testing, AI agents, testing best practices',
  openGraph: {
    title: 'Blog - Latest Insights in AI and Testing | Automatrix',
    description: 'Expert perspectives on modern testing practices, AI-powered automation, and quality assurance strategies from the Automatrix team.',
    type: 'website',
    siteName: 'Automatrix',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Latest Insights in AI and Testing | Automatrix',
    description: 'Expert perspectives on modern testing practices, AI-powered automation, and quality assurance strategies from the Automatrix team.',
  },
}

export default function BlogPage() {
  return <BlogContent />
} 