'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

type TabKey = 'agent' | 'task' | 'learn' | 'interact'

type TabContent = {
  name: string
  code: string
}

type Tabs = {
  [K in TabKey]: TabContent
}

export default function Hero() {
  const [activeTab, setActiveTab] = useState<TabKey>('agent')
  
  const tabs: Tabs = {
    agent: {
      name: 'agent.py',
      code: `# AI Agent initialization

async def create_agent(config):
    agent = await initialize({
        "model": "advanced-llm",
        "capabilities": ["reasoning", "learning"],
        "adaptation": True,
        "memory": "long-term"
    })
    return agent`
    },
    task: {
      name: 'tasks.py',
      code: `# Task execution pipeline

async def execute_tasks(agent, tasks):
    results = await agent.process({
        "workflow": tasks,
        "optimization": True,
        "parallel": True,
        "monitoring": "real-time"
    })
    return results`
    },
    learn: {
      name: 'learning.py',
      code: `# Continuous learning system

async def improve_agent(agent, feedback):
    knowledge = await agent.learn({
        "experience": feedback,
        "pattern_recognition": True,
        "adaptation_rate": 0.8,
        "validation": "real-time"
    })
    return knowledge.insights`
    },
    interact: {
      name: 'interaction.py',
      code: `# Multi-agent communication

async def coordinate_agents(agents, context):
    network = await establish_network({
        "topology": "mesh",
        "protocol": "consensus",
        "security": "encrypted",
        "fallback": True
    })
    return network.connect(agents)`
    }
  }

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
              <div className="flex text-sm overflow-x-auto">
                {(Object.entries(tabs) as [TabKey, TabContent][]).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-6 py-3 transition-colors duration-200 whitespace-nowrap ${
                      activeTab === key 
                        ? 'bg-[#1a1b26] text-white border-r border-gray-800' 
                        : 'text-gray-500 hover:text-gray-400'
                    }`}
                  >
                    {value.name}
                  </button>
                ))}
              </div>
              {/* Code content */}
              <div className="font-mono text-[15px] bg-[#1a1b26] p-8">
                {tabs[activeTab].code.split('\n').map((line: string, i: number) => (
                  <div 
                    key={i} 
                    className={`${
                      line.startsWith('#') 
                        ? 'text-emerald-400' 
                        : line.match(/["'][^"']*["']/) 
                          ? 'text-amber-300'
                          : line.match(/True|False/) 
                            ? 'text-violet-400'
                            : 'text-white'
                    } whitespace-pre`}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 