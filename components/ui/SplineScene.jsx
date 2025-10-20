// components/SplineScene.js
'use client'

import Spline from '@splinetool/react-spline'
import { useEffect, useState } from 'react'

export default function SplineScene({
    sceneUrl = "https://prod.spline.design/0PMuB12cmQMtH4FZ/scene.splinecode",
    className = "",
    showLoadingState = true,
    fallbackContent = null
}) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleLoad = (splineApp) => {
        setIsLoading(false)
    }

    const handleError = (error) => {
        setHasError(true)
        setIsLoading(false)
    }

    // Don't render on server
    if (!isClient) {
        return (
            <div className={`w-full h-full flex items-center justify-center ${className}`}>
                {showLoadingState && (
                    <div className="text-center">
                        <div className="animate-pulse">
                            <p className="text-sm text-gray-500">Initializing...</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    // Error state
    if (hasError) {
        return fallbackContent || (
            <div className={`w-full h-full flex items-center justify-center ${className}`}>
                <div className="text-center">
                    <p className="text-sm text-gray-500">3D content unavailable</p>
                </div>
            </div>
        )
    }

    return (
        <div className={`relative w-full h-full ${className}`}>
            {/* loading overlay */}
            {isLoading && showLoadingState && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/5">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
                        <p className="text-sm text-gray-500">Loading 3D Scene...</p>
                    </div>
                </div>
            )}

            {/* spline scene */}
            <Spline
                scene={sceneUrl}
                onLoad={handleLoad}
                onError={handleError}
                style={{ width: '100%', height: '100%', borderRadius: '8px', border: '1px solid var(--border-light)' }}

            />
        </div>
    )
}