'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ensure consistent initial render
  const headerBg = mounted && isScrolled 
    ? 'bg-[#0A0A2A]/95 backdrop-blur-md' 
    : 'bg-[#0A0A2A]/80 backdrop-blur-sm'

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'What We Do', href: '/services' },
    { name: 'Blog', href: '/blog' },
  ]

  // Don't render mobile menu until mounted
  if (!mounted) {
    return (
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50"
      >
        {/* Glassmorphism background */}
        <div className={`absolute inset-0 transition-all duration-300 ${headerBg}`} />
        {/* Rest of the header content without mobile menu */}
        <nav className="relative mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
          <div className="flex h-16 items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex lg:flex-1"
            >
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-violet-200 to-violet-400">
                  Automatrix
                </span>
              </Link>
            </motion.div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:gap-x-12">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`nav-link text-base font-medium ${
                    pathname === link.href 
                      ? 'text-white after:w-full' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <motion.a
                href="/contact"
                className="relative group px-4 py-2 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button background with animated border */}
                <div className="absolute inset-0 bg-violet-600/20 rounded-lg group-hover:bg-violet-600/30 transition-colors duration-200" />
                <div className="absolute inset-0 rounded-lg border border-violet-500/50 group-hover:border-violet-400/70 transition-colors duration-200" />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-violet-500/20 blur-sm" />
                {/* Button text */}
                <span className="relative text-white">Contact Us</span>
              </motion.a>
            </div>
          </div>
        </nav>
      </motion.header>
    )
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50"
    >
      {/* Glassmorphism background */}
      <div className={`absolute inset-0 transition-all duration-300 ${headerBg}`} />

      {/* Animated border */}
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent pointer-events-none" />

      <nav className="relative mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex lg:flex-1"
          >
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-violet-200 to-violet-400">
                Automatrix
              </span>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:bg-violet-500/10 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"}
                />
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`nav-link text-base font-medium ${
                  pathname === link.href 
                    ? 'text-white after:w-full' 
                    : 'text-gray-300 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <motion.a
              href="/contact"
              className="relative group px-4 py-2 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button background with animated border */}
              <div className="absolute inset-0 bg-violet-600/20 rounded-lg group-hover:bg-violet-600/30 transition-colors duration-200" />
              <div className="absolute inset-0 rounded-lg border border-violet-500/50 group-hover:border-violet-400/70 transition-colors duration-200" />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-violet-500/20 blur-sm" />
              {/* Button text */}
              <span className="relative text-white">Contact Us</span>
            </motion.a>
          </div>
        </div>

        {/* Mobile menu with AnimatePresence */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mt-6 pb-6 space-y-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={`block nav-link ${pathname === link.href ? 'text-white after:w-full' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href="/contact"
                  className="block text-center mt-4 px-4 py-2 text-sm font-medium text-white bg-violet-600/20 border border-violet-500/50 rounded-lg hover:bg-violet-600/30 hover:border-violet-400/70 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
} 