'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

const SPRING = { stiffness: 150, damping: 15, mass: 0.1 }

export default function MagneticButton({ children, className, ...props }) {
  const buttonRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, SPRING)
  const y = useSpring(my, SPRING)

  const handleMouseMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.15)
    my.set((e.clientY - rect.top - rect.height / 2) * 0.15)
  }

  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.button
      ref={buttonRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
