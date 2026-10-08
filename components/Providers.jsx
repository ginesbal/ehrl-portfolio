'use client'

import ErrorBoundary from '@/components/ui/ErrorBoundary.jsx'
import { MotionConfig } from 'framer-motion'

// The client-only wrappers, so the root layout can stay a server component (and own the metadata).
export default function Providers({ children }) {
  return (
    <ErrorBoundary>
      {/* framer ignores prefers-reduced-motion unless told to */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ErrorBoundary>
  )
}
