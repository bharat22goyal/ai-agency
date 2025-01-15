'use client'

import Footer from '@/components/Footer'
import Background from '@/components/Background'
import { 
  SparklesIcon,
  ChatBubbleBottomCenterTextIcon,
  CpuChipIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline'

const services = [
  {
    name: 'Custom AI Agent Development',
    description: 'Build sophisticated AI agents tailored to your specific business needs and workflows.',
    icon: CpuChipIcon,
    features: [
      'Specialized Task Automation',
      'Natural Language Processing',
      'Multi-Agent Coordination',
      'Custom Knowledge Integration',
      'Continuous Learning Capabilities',
    ],
    benefits: 'Automate complex tasks and decision-making processes with intelligent AI agents.',
  },
  {
    name: 'Conversational AI Solutions',
    description: 'Create engaging and context-aware conversational agents that understand and respond naturally.',
    icon: ChatBubbleBottomCenterTextIcon,
    features: [
      'Natural Language Understanding',
      'Context-Aware Responses',
      'Multi-Channel Integration',
      'Sentiment Analysis',
      'Personalized Interactions',
    ],
    benefits: 'Enhance customer engagement and support with 24/7 intelligent conversation.',
  },
  {
    name: 'AI Process Automation',
    description: 'Transform your workflows with intelligent agents that learn and adapt to your business processes.',
    icon: SparklesIcon,
    features: [
      'Workflow Automation',
      'Intelligent Decision Making',
      'Data Analysis & Insights',
      'Process Optimization',
      'Error Detection & Handling',
    ],
    benefits: 'Reduce manual work by 90% while improving accuracy and efficiency.',
  },
  {
    name: 'AI Integration & Deployment',
    description: 'Seamlessly integrate and deploy AI agents into your existing systems and infrastructure.',
    icon: RocketLaunchIcon,
    features: [
      'System Integration',
      'Cloud Deployment',
      'Performance Monitoring',
      'Security Implementation',
      'Scalability Management',
    ],
    benefits: 'Quick deployment and seamless integration with your existing tech stack.',
  },
]

export default function Services() {
  return (
    <>
      <Background />
      <div className="relative isolate pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="animate-fade-in">
              <h2 className="text-base font-semibold leading-7 text-violet-400">Our Services</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Intelligent AI Agent Solutions
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Transform your business with cutting-edge AI agents that automate complex tasks, enhance decision-making, and deliver exceptional results through advanced artificial intelligence.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="cyber-card relative p-8 animate-fade-in"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 