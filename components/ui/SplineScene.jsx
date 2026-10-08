// spline 3d scene wrapper (load via next/dynamic with ssr: false)
'use client'

import Spline from '@splinetool/react-spline'
import { useState } from 'react'

export default function SplineScene({ sceneUrl, className = '', fallbackContent = null }) {
    const [status, setStatus] = useState('loading')

    if (status === 'error') return fallbackContent

    return (
        <div className={`relative w-full h-full ${className}`}>
            {status === 'loading' && (
                <p className="absolute inset-0 grid place-items-center text-[13px] text-text-muted">Loading…</p>
            )}
            <Spline
                scene={sceneUrl}
                onLoad={() => setStatus('ready')}
                onError={() => setStatus('error')}
                style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
            />
        </div>
    )
}
