'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Shared modal behaviour: focus management, ESC key, scroll lock
 */
export function useModalBehaviour(onClose) {
  const dialogRef = useRef(null)
  const lastActiveRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Save focus and lock scroll
    lastActiveRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    
    // ESC key handler
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)

    // Focus first interactive element
    const focusTimeout = setTimeout(() => {
      const firstFocusable = dialogRef.current?.querySelector(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    }, 50)

    // Cleanup
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
      clearTimeout(focusTimeout)
      
      // Restore focus
      if (lastActiveRef.current?.focus) {
        lastActiveRef.current.focus()
      }
    }
  }, [onClose])

  // Scroll progress tracker
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    const progress = scrollTop / (scrollHeight - clientHeight)
    setScrollProgress(progress || 0)
  }

  return { dialogRef, scrollProgress, handleScroll }
}