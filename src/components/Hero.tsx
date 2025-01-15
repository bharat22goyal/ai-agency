'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="relative pt-32 lg:pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Building Intelligent AI Agents for Tomorrow
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              Transform your business with our cutting-edge AI agents. From intelligent automation to sophisticated conversational systems, we build solutions that evolve with your needs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10"
            >
              <a
                href="/contact"
                className="rounded-lg bg-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-500/30 hover:bg-violet-500 hover:shadow-violet-400/30 transition-all duration-300"
              >
                Start Your AI Journey
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              {/* Tabs */}
              <div className="flex text-sm">
                <div className="px-6 py-3 bg-[#1a1b26] text-white border-r border-gray-800">
                  dashboard.py
                </div>
                <div className="px-6 py-3 text-gray-500">
                  analytics.py
                </div>
              </div>
              {/* Code content */}
              <div className="font-mono text-[15px] bg-[#1a1b26] p-8">
                <div className="text-emerald-400"># AI-powered automation</div>
                <div className="text-white mt-4">async def automate():</div>
                <div className="text-white ml-8">efficiency = await process({'{'}</div>
                <div className="text-white ml-12">"process": "business-logic",</div>
                <div className="text-white ml-12">"optimization": True,</div>
                <div className="text-white ml-12">"intelligence": "artificial"</div>
                <div className="text-white ml-8">{'}'})</div>
                <div className="text-white ml-8">return efficiency</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 