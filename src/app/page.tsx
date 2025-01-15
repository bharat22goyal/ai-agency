'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import ServicesPreview from '@/components/ServicesPreview'

export default function Home() {
  return (
    <>
      <main className="flex-grow">
        <Hero />
        <Stats />
        <ServicesPreview />
      </main>
    </>
  )
}
