'use client'

import { useRef } from 'react'

export default function MagneticButton({ children, className, ...props }) {
  const buttonRef = useRef(null)

  const handleMouseMove = (e) => {
    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    // Subtle 15% movement
    button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
  }

  const handleMouseLeave = () => {
    buttonRef.current.style.transform = 'translate(0, 0)'
  }

  return (
    <button
      ref={buttonRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s var(--ease-out-quart)' }}
      {...props}
    >
      {children}
    </button>
  )
}