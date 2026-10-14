// spline 3d scene wrapper (load via next/dynamic with ssr: false)
'use client'

import ErrorBoundary from '@/components/ui/ErrorBoundary.jsx'
import Spline from '@splinetool/react-spline'
import { useState } from 'react'

export default function SplineScene({ sceneUrl, className = '', fallbackContent = null }) {
    const [loaded, setLoaded] = useState(false)

    return (
        // The runtime throws when the scene, its decoder or WebGL is unavailable (it has no
        // onError); this boundary keeps that inside the circle instead of the page-wide one.
        <ErrorBoundary fallback={fallbackContent}>
            <div className={`relative w-full h-full ${className}`}>
                {!loaded && (
                    <p className="absolute inset-0 grid place-items-center text-[13px] text-text-muted">Loading…</p>
                )}
                <Spline
                    scene={sceneUrl}
                    onLoad={() => setLoaded(true)}
                    style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                />
            </div>
        </ErrorBoundary>
    )
}
