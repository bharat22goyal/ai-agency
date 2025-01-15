'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <>
      <div className="relative min-h-screen">
        {/* Background container */}
        <div className="fixed inset-0">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid opacity-25" />
          {/* Glow effect */}
          <div className="absolute inset-0 bg-glow opacity-75" />
          {/* Moving lines */}
          <div className="absolute inset-0 cyber-lines opacity-20" />
        </div>

        {/* Content */}
        <main className="relative">
          <div className="relative py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl space-y-16">
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Contact Us</h2>
                  <p className="mt-4 text-lg text-gray-300">
                    Get in touch with us to discuss how we can help transform your business with AI solutions.
                  </p>
                </div>

                <div className="cyber-card">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white">
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white">
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white">
                        Message
                      </label>
                      <div className="mt-2">
                        <textarea
                          name="message"
                          id="message"
                          rows={4}
                          required
                          className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full rounded-md bg-violet-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">Our Office</h3>
                  <p className="mt-2 text-gray-300">123 Innovation Drive, Suite 200</p>
                  <p className="text-gray-300">Chicago, IL 60601</p>
                  <p className="mt-4 text-gray-300">contact@automatrix.com</p>
                  <p className="text-gray-300">+1 (312) 555-0123</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-white">Business Hours</h4>
                    <p className="mt-2 text-gray-300">Monday-Friday: 9:00 AM - 6:00 PM CST</p>
                    <p className="text-gray-300">Saturday-Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
} 