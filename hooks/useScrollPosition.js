import { useEffect, useState } from 'react'

export default function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down')
  const [prevScroll, setPrevScroll] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollPosition = () => {
      const position = window.scrollY
      setScrollPosition(position)

      if (position > prevScroll) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }

      setPrevScroll(position)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScroll])

  return { scrollPosition, scrollDirection }
}