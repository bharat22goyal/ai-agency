'use client'

import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const posts = [
  {
    id: 1,
    title: 'The Future of Testing: AI-Driven Automation',
    description: 'Explore how artificial intelligence is revolutionizing software testing with self-healing scripts, intelligent test generation, and automated maintenance.',
    content: `Artificial intelligence is transforming the landscape of software testing, introducing capabilities that were once thought impossible. Self-healing scripts can now automatically adapt to changes in the application under test, reducing maintenance overhead and improving test reliability.

    Key innovations in AI-driven testing:
    • Intelligent test generation based on user behavior patterns
    • Automated visual regression testing with machine learning
    • Smart element locator strategies that adapt to DOM changes
    • Predictive analytics for test failure analysis
    • Automated test case optimization and prioritization

    The impact of these advances is significant, with organizations reporting:
    • 80% reduction in test maintenance effort
    • 60% faster test execution
    • 95% improvement in test reliability
    • 40% reduction in overall testing costs`,
    category: { name: 'Testing Trends', href: '#' },
    author: {
      name: 'Dr. Sarah Johnson',
      role: 'Head of Test Automation',
    },
    date: 'Mar 16, 2024',
    datetime: '2024-03-16',
    readingTime: '6 min read',
  },
  {
    id: 2,
    title: 'Building Robust Test Automation Frameworks',
    description: 'Learn the key strategies and best practices for developing scalable, maintainable test automation frameworks that stand the test of time.',
    content: `A well-designed test automation framework is the foundation of successful testing efforts. This article explores the essential components and best practices for building frameworks that scale.

    Framework Design Principles:
    • Modular architecture for reusability
    • Data-driven testing capabilities
    • Cross-browser and cross-platform support
    • Detailed reporting and analytics
    • CI/CD integration
    
    Implementation Best Practices:
    • Use of design patterns (Page Object, Factory)
    • Proper error handling and logging
    • Configuration management
    • Test data management
    • Version control strategies`,
    category: { name: 'Best Practices', href: '#' },
    author: {
      name: 'Michael Chen',
      role: 'Senior Test Architect',
    },
    date: 'Mar 10, 2024',
    datetime: '2024-03-10',
    readingTime: '8 min read',
  },
  {
    id: 3,
    title: 'Continuous Testing in Modern CI/CD Pipelines',
    description: 'Understanding how to implement effective continuous testing strategies in your CI/CD pipeline for faster, more reliable releases.',
    content: `Continuous Testing is essential for modern software delivery. This article explores how to integrate testing effectively into your CI/CD pipeline.

    Key Components:
    • Automated test selection and prioritization
    • Parallel test execution
    • Environment management
    • Test data provisioning
    • Results analysis and reporting

    Implementation Strategy:
    • Early testing in the pipeline
    • Risk-based test prioritization
    • Automated environment provisioning
    • Real-time test results analysis
    • Feedback loop optimization`,
    category: { name: 'DevOps', href: '#' },
    author: {
      name: 'Emily Rodriguez',
      role: 'DevOps Testing Lead',
    },
    date: 'Mar 5, 2024',
    datetime: '2024-03-05',
    readingTime: '7 min read',
  },
]

export default function Blog() {
  const [expandedPost, setExpandedPost] = useState<number | null>(null)

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
              Latest Insights in Test Automation
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
                className="cyber-card"
              >
                <div className="relative w-full">
                  <div className="aspect-[16/9] w-full rounded-2xl placeholder-image" />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-violet-500/20" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time dateTime={post.datetime} className="text-gray-400">
                      {post.date}
                    </time>
                    <span className="inline-flex items-center rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
                      {post.category.name}
                    </span>
                    <span className="text-gray-400">{post.readingTime}</span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                      <span className="absolute inset-0" />
                      {post.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-300">
                      {post.description}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <div className="h-10 w-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-violet-400">
                        {post.author.name[0]}
                      </span>
                    </div>
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-white">
                        {post.author.name}
                      </p>
                      <p className="text-gray-400">{post.author.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                  >
                    {expandedPost === post.id ? 'Show Less' : 'Read More'}
                  </button>
                </div>
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