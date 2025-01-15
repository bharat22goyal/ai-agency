'use client'

import { motion } from 'framer-motion'
import { CommandLineIcon, CpuChipIcon, CircleStackIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'

const services = [
  {
    name: 'Custom AI Agents',
    description: 'Build intelligent agents tailored to your specific business needs that learn and adapt over time.',
    icon: CpuChipIcon,
  },
  {
    name: 'Conversational AI',
    description: 'Create sophisticated chatbots and virtual assistants that understand context and maintain engaging dialogues.',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: 'Process Automation',
    description: 'Automate complex workflows with intelligent agents that make decisions and adapt to changes.',
    icon: CommandLineIcon,
  },
  {
    name: 'Data Intelligence',
    description: 'Harness the power of AI to analyze data, extract insights, and make data-driven recommendations.',
    icon: CircleStackIcon,
  },
]

export default function ServicesPreview() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Transform Your Business with AI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-gray-300"
          >
            Leverage our cutting-edge AI solutions to automate processes, enhance decision-making, and drive innovation.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600">
                    <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {service.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{service.description}</p>
                  <p className="mt-6">
                    <a href="/services" className="text-sm font-semibold leading-6 text-violet-400">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 