'use client'

import { useEffect, useRef } from 'react'

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Node class for neural network visualization
    class Node {
      x: number
      y: number
      radius: number
      connections: Node[]
      speed: { x: number; y: number }
      hue: number
      brightness: number

      constructor(width: number, height: number) {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.radius = 1 + Math.random() * 2
        this.connections = []
        this.speed = {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        }
        this.hue = Math.random() * 60 - 30 // Range from -30 to 30
        this.brightness = 0.5 + Math.random() * 0.3 // Increased base brightness
      }

      update(width: number, height: number) {
        this.x += this.speed.x
        this.y += this.speed.y

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.speed.x *= -1
        if (this.y < 0 || this.y > height) this.speed.y *= -1

        // Keep within bounds
        this.x = Math.max(0, Math.min(width, this.x))
        this.y = Math.max(0, Math.min(height, this.y))
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw node
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${270 + this.hue}, 100%, 70%, ${this.brightness})`
        ctx.fill()

        // Draw glow
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${270 + this.hue}, 100%, 70%, ${this.brightness * 0.4})`
        ctx.fill()
      }
    }

    // Create nodes
    const nodes: Node[] = Array(100).fill(null).map(() => new Node(canvas.width, canvas.height))

    // Find connections
    const maxDistance = 150
    nodes.forEach(node => {
      nodes.forEach(otherNode => {
        if (node !== otherNode) {
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < maxDistance) {
            node.connections.push(otherNode)
          }
        }
      })
    })

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgb(3, 0, 20)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach(node => {
        node.update(canvas.width, canvas.height)
        
        // Draw connections
        node.connections.forEach(connectedNode => {
          const dx = node.x - connectedNode.x
          const dy = node.y - connectedNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3 // Increased connection opacity
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(connectedNode.x, connectedNode.y)
            ctx.strokeStyle = `hsla(270, 100%, 70%, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })

        node.draw(ctx)
      })

      // Add ambient glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      )
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.05)')
      gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)')
      gradient.addColorStop(1, 'rgba(3, 0, 20, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'rgb(3, 0, 20)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgb(3,0,20)] opacity-70" />
    </div>
  )
} 