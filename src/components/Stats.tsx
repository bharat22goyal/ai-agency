'use client'

import { motion } from 'framer-motion'

const stats = [
  { id: 1, name: 'AI Agents Deployed', value: '500+' },
  { id: 2, name: 'Process Automation Rate', value: '95%' },
  { id: 3, name: 'Client Satisfaction', value: '98%' },
  { id: 4, name: 'Time Saved', value: '10,000+ hrs' },
]

export default function Stats() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-gray-400">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  )
} 