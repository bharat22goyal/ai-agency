'use client'

import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import ServicesPreview from '@/components/ServicesPreview'
import Footer from '@/components/Footer'
import Background from '@/components/Background'

export default function Home() {
  return (
    <>
      <Background />
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
