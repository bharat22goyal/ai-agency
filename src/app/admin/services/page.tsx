'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

type Service = {
  id: string
  name: string
  description: string
  features: string[]
  benefits: string
  icon: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminServices() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    features: [''],
    benefits: '',
    icon: 'SparklesIcon',
    published: false
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchServices()
    }
  }, [status, router])

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
      setServices([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    try {
      const url = '/api/services'
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { ...formData, id: editingId } : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || data.message || 'Failed to save service')
      }

      await fetchServices()
      setFormData({
        name: '',
        description: '',
        features: [''],
        benefits: '',
        icon: 'SparklesIcon',
        published: false
      })
      setEditingId(null)
    } catch (error) {
      console.error('Error saving service:', error)
      setError(error instanceof Error ? error.message : 'Failed to save service')
    }
  }

  const handleEdit = (service: Service) => {
    setFormData({
      name: service.name,
      description: service.description,
      features: service.features,
      benefits: service.benefits,
      icon: service.icon,
      published: service.published
    })
    setEditingId(service.id)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const response = await fetch('/api/services', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error('Failed to delete service')

      await fetchServices()
    } catch (error) {
      console.error('Error deleting service:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete service')
    }
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }))
  }

  if (status === 'loading' || loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (status === 'unauthenticated') {
    return <div className="text-center py-12">Access denied. Please sign in.</div>
  }

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-8"
        >
          Services Management
        </motion.h1>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6 mb-12"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-0 bg-gray-800 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-0 bg-gray-800 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Features
            </label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 rounded-md border-0 bg-gray-800 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-violet-500"
                  placeholder="Enter feature"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="px-3 py-2 rounded-md bg-red-900/30 text-red-400 hover:bg-red-900/50"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="mt-2 text-sm text-violet-400 hover:text-violet-300"
            >
              + Add Feature
            </button>
          </div>

          <div>
            <label htmlFor="benefits" className="block text-sm font-medium text-gray-300">
              Benefits
            </label>
            <textarea
              id="benefits"
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-0 bg-gray-800 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-300">
              Icon
            </label>
            <select
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="mt-1 block w-full rounded-md border-0 bg-gray-800 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-violet-500"
            >
              <option value="SparklesIcon">Sparkles</option>
              <option value="CommandLineIcon">Command Line</option>
              <option value="CpuChipIcon">CPU Chip</option>
              <option value="CircleStackIcon">Circle Stack</option>
              <option value="ChatBubbleBottomCenterTextIcon">Chat Bubble</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-violet-600 focus:ring-violet-500"
            />
            <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-300">
              Published
            </label>
          </div>

          <button
            type="submit"
            className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            {editingId ? 'Update Service' : 'Create Service'}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold text-white">Services</h2>
          <div className="grid gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-lg bg-gray-800 p-6 shadow-sm ring-1 ring-gray-700"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">{service.name}</h3>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-sm text-violet-400 hover:text-violet-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-300">
                  Status: {service.published ? 'Published' : 'Draft'}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Icon: {service.icon}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Created: {new Date(service.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 