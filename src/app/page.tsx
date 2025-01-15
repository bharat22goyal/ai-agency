'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import ServicesPreview from '@/components/ServicesPreview'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen">
        {/* Background container */}
        <div className="fixed inset-0">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid opacity-25" />
          {/* Glow effect */}
          <div className="absolute inset-0 bg-glow opacity-75" />
          {/* Moving lines */}
          <div className="absolute inset-0 cyber-lines opacity-20" />
        </div>

        {/* Content */}
        <main className="relative">
          <Hero />
          <Stats />
          <ServicesPreview />
        </main>
      </div>
      <Footer />
    </>
  )
}
