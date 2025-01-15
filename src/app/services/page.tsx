'use client'

import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { 
  BeakerIcon,
  CommandLineIcon,
  CpuChipIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

const services = [
  {
    name: 'AI-Powered Test Automation',
    description: 'Leverage artificial intelligence to create self-healing test scripts and intelligent test maintenance.',
    icon: CpuChipIcon,
    features: [
      'Self-Healing Test Scripts',
      'AI-Based Element Location',
      'Intelligent Test Generation',
      'Visual Regression Testing',
      'Automated Test Maintenance',
    ],
    benefits: 'Reduce test maintenance by 80% while improving test reliability and coverage.',
  },
  {
    name: 'End-to-End Testing Solutions',
    description: 'Comprehensive testing across web, mobile, and API interfaces with advanced automation frameworks.',
    icon: BeakerIcon,
    features: [
      'Cross-browser Testing',
      'Mobile App Testing',
      'API Testing & Integration',
      'Performance Testing',
      'Continuous Testing in CI/CD',
    ],
    benefits: 'Achieve 90% test automation coverage and reduce testing time by 60%.',
  },
  {
    name: 'Test Process Optimization',
    description: 'Streamline your testing processes with intelligent test planning and execution strategies.',
    icon: CommandLineIcon,
    features: [
      'Test Strategy Development',
      'Test Case Optimization',
      'Risk-Based Testing',
      'Test Environment Management',
      'Test Data Management',
    ],
    benefits: 'Optimize testing efficiency by 75% and reduce testing costs by 50%.',
  },
  {
    name: 'Quality Assurance & Security',
    description: 'Ensure application quality and security with comprehensive testing and monitoring.',
    icon: ShieldCheckIcon,
    features: [
      'Functional Testing',
      'Security Testing',
      'Accessibility Testing',
      'Performance Monitoring',
      'Quality Metrics & Reporting',
    ],
    benefits: 'Identify 95% of critical issues before production and ensure compliance with quality standards.',
  },
]

export default function Services() {
  return (
    <>
      <div className="relative isolate pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-base font-semibold leading-7 text-violet-400">Our Services</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                AI-Powered Testing Solutions
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Transform your quality assurance with intelligent test automation powered by AI, delivering faster, more reliable, and comprehensive testing coverage.
              </p>
            </motion.div>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="cyber-card"
                >
                  <div className="flex items-center gap-x-4">
                    <service.icon className="h-8 w-8 flex-none text-violet-400" />
                    <h3 className="text-lg font-semibold leading-8 text-white">{service.name}</h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-gray-300">{service.description}</p>
                  
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold leading-6 text-gray-200">Key Features</h4>
                    <ul className="mt-2 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-sm leading-6 text-gray-300">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-violet-500/20">
                    <h4 className="text-sm font-semibold leading-6 text-gray-200">Benefits</h4>
                    <p className="mt-2 text-sm leading-6 text-gray-300">{service.benefits}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 