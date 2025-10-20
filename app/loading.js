'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  const circles = [0, 1, 2]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const circleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: [-50, 50, -50],
      transition: {
        y: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }
    }
  }

  const circleVariantsPortrait = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      x: [-50, 50, -50],
      transition: {
        x: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex gap-4 portrait:flex-col landscape:flex-row"
      >
        {circles.map((i) => (
          <motion.div
            key={i}
            variants={circleVariants}
            className="circle w-4 h-4 rounded-full bg-reseda-green hidden landscape:block"
          />
        ))}
        {circles.map((i) => (
          <motion.div
            key={`portrait-${i}`}
            variants={circleVariantsPortrait}
            className="circle w-4 h-4 rounded-full bg-rose-taupe block portrait:block landscape:hidden"
          />
        ))}
      </motion.div>
    </div>
  )
}