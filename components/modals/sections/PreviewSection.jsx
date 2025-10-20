'use client'

import PhoneMockup from '@/components/projects/PhoneMockup'
import { useState } from 'react'

export default function PreviewSection({ project }) {
    const [iframeError, setIframeError] = useState(false)
    const isMobile = project.category?.toLowerCase().includes('mobile')
    const isExternal = project.demo?.startsWith('http')

    // Mobile projects get phone mockup
    if (isMobile) {
        return (
            <div className="flex justify-center py-4">
                <PhoneMockup
                    demoUrl={project.demo}
                    screenshots={project.screenshots || project.gallery || []}
                />
            </div>
        )
    }

    // External URLs that might block iframe
    if (isExternal && iframeError) {
        return (
            <div
                className="rounded-2xl overflow-hidden border"
                style={{
                    borderColor: 'var(--border-light)',
                    background: 'var(--bg-accent)'
                }}
            >
                <div className="aspect-video flex flex-col items-center justify-center p-8">
                    <div className="text-center space-y-4">
                        <div className="text-5xl mb-2">🚀</div>
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                            External Demo Available
                        </h3>
                        <p className="text-sm max-w-md" style={{ color: 'var(--text-secondary)' }}>
                            This project is hosted externally and cannot be embedded. 
                            Click below to view it in a new tab.
                        </p>
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200"
                            style={{
                                background: 'var(--rose-taupe)',
                                color: 'white'
                            }}
                        >
                            Open Live Demo
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 3h7v7M14 3L8 9" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    // iframe first for all demos
    if (project.demo) {
        return (
            <div
                className="rounded-2xl overflow-hidden border"
                style={{
                    borderColor: 'var(--border-light)',
                    background: 'var(--bg-accent)'
                }}
            >
                <div className="aspect-video relative">
                    {isExternal ? (
                        <>
                            <iframe
                                src={project.demo}
                                title={project.title}
                                className="w-full h-full"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media"
                                onError={() => setIframeError(true)}
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            />
                            {/* Overlay hint for external demos */}
                            <div 
                                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
                                style={{
                                    background: 'rgba(107, 79, 79, 0.9)',
                                    color: 'white',
                                    backdropFilter: 'blur(4px)'
                                }}
                            >
                                EXTERNAL SITE
                            </div>
                        </>
                    ) : (
                        <iframe
                            src={project.demo}
                            title={project.title}
                            className="w-full h-full"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media"
                        />
                    )}
                </div>
            </div>
        )
    }

    // No demo available
    return (
        <div
            className="rounded-2xl overflow-hidden border"
            style={{
                borderColor: 'var(--border-light)',
                background: 'var(--bg-accent)'
            }}
        >
            <div className="aspect-video flex items-center justify-center">
                <div className="text-center">
                    <div className="text-5xl mb-3" aria-hidden="true">🖥️</div>
                    <p style={{ color: 'var(--text-muted)' }}>Live preview coming soon</p>
                </div>
            </div>
        </div>
    )
}