'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import { 
  SparklesIcon,
  ChatBubbleBottomCenterTextIcon,
  CpuChipIcon,
  CommandLineIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline'

type Service = {
  id: string
  name: string
  description: string
  features: string[]
  benefits: string
  icon: string
  published: boolean
}

const iconComponents = {
  SparklesIcon,
  ChatBubbleBottomCenterTextIcon,
  CpuChipIcon,
  CommandLineIcon,
  CircleStackIcon,
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to fetch services')
      }

      setServices(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching services:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch services')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="relative isolate pt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">Loading...</div>
          </div>
        </div>
      </PageTransition>
    )
  }

  if (error) {
    return (
      <PageTransition>
        <div className="relative isolate pt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center text-red-400">
              <p>Error: {error}</p>
              <button
                onClick={() => fetchServices()}
                className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-500"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="relative isolate pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="animate-fade-in">
              <h2 className="text-base font-semibold leading-7 text-violet-400">Our Services</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Intelligent AI Agent Solutions
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Transform your business with cutting-edge AI agents that automate complex tasks, enhance decision-making, and drive innovation.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {services.map((service, index) => {
                const IconComponent = iconComponents[service.icon as keyof typeof iconComponents]
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="cyber-card"
                  >
                    <dt className="text-base font-semibold leading-7 text-white">
                      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600">
                        {IconComponent && <IconComponent className="h-6 w-6 text-white" aria-hidden="true" />}
                      </div>
                      {service.name}
                    </dt>
                    <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                      <p className="flex-auto">{service.description}</p>
                      <div className="mt-6 space-y-4">
                        <h4 className="text-sm font-semibold leading-6 text-gray-200">Key Features</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="text-sm leading-6 text-gray-300">
                              • {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6 pt-6 border-t border-violet-500/20">
                        <h4 className="text-sm font-semibold leading-6 text-gray-200">Benefits</h4>
                        <p className="mt-2 text-sm leading-6 text-gray-300">{service.benefits}</p>
                      </div>
                    </dd>
                  </motion.div>
                )
              })}
            </dl>
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  )
} 