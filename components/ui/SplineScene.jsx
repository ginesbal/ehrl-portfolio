// spline 3d scene wrapper (load via next/dynamic with ssr: false; wrap it in an ErrorBoundary)
'use client'

import Spline from '@splinetool/react-spline'
import { useState } from 'react'

export default function SplineScene({ sceneUrl, className = '' }) {
    const [loaded, setLoaded] = useState(false)

    return (
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
    )
}
