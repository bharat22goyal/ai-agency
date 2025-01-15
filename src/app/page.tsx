'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import ServicesPreview from '@/components/ServicesPreview'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      {/* Background Effects - Fixed */}
      <div className="fixed inset-0 z-0">
        <div className="bg-grid absolute inset-0" />
        <div className="bg-glow absolute inset-0" />
        <div className="bg-aurora absolute inset-0" />
        <div className="cyber-lines absolute inset-0" />
      </div>

      {/* Content Container - Scrollable */}
      <div className="relative z-10">
        <main>
          <Hero />
          <Stats />
          <ServicesPreview />
        </main>
        <Footer />
      </div>
    </>
  )
}
