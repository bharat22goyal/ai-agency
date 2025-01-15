'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'
import Background from './Background'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1.000], // Cubic bezier for smooth easing
      staggerChildren: 0.1,
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1.000],
    }
  }
}

const contentVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1.000],
    }
  },
  exit: {
    opacity: 0,
    y: -20,
  }
}

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <Background />
      <AnimatePresence mode="wait">
        <motion.div
          key="page-transition"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10"
        >
          <motion.div
            variants={contentVariants}
            className="min-h-screen"
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  )
} 