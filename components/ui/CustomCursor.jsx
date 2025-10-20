'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      
      setIsHovering(isInteractive)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 2.5
    },
    click: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 0.8
    }
  }

  const springConfig = {
    type: "spring",
    stiffness: 500,
    damping: 28
  }

  return (
    <>
      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-purple-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={isClicking ? 'click' : isHovering ? 'hover' : 'default'}
        variants={variants}
        transition={springConfig}
      />
      
      {/* Cursor outline */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-purple-500/50 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgb(168 85 247)' : 'rgb(168 85 247 / 0.5)'
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      />
    </>
  )
}