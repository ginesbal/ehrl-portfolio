'use client'

import { useModalBehaviour } from '../hooks/useModalBehaviour'
import ModalHeader from '../sections/ModalHeader'
import PreviewSection from '../sections/PreviewSection'
import MetricsSection from '../sections/MetricsSection'
import DetailsSection from '../sections/DetailsSection'
import TechStack from '../sections/TechStack'
import ModalFooter from '../sections/ModalFooter'
import { useEffect, useState } from 'react'

export default function StandardLayout({ project, onClose }) {
    const { dialogRef, scrollProgress, handleScroll } = useModalBehaviour(onClose)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Trigger entrance animation after mount
        requestAnimationFrame(() => {
            setIsVisible(true)
        })
    }, [])

    return (
        <div className="fixed inset-0 z-[1000]">
            {/* Backdrop with fade in */}
            <div
                className="fixed inset-0 transition-all duration-300"
                onClick={onClose}
                style={{
                    background: isVisible ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0)',
                    backdropFilter: 'blur(12px)'
                }}
            />

            {/* Modal with scale animation */}
            <div
                ref={dialogRef}
                className="relative z-[1001] h-full flex items-center justify-center p-4 md:p-8"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div
                    className="w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-300"
                    style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-light)',
                        maxWidth: '1040px',
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
                        opacity: isVisible ? 1 : 0
                    }}
                >
                    <ModalHeader
                        project={project}
                        onClose={onClose}
                        scrollProgress={scrollProgress}
                    />

                    <div
                        className="flex-1 overflow-y-auto"
                        onScroll={handleScroll}
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        <div className="p-8 space-y-8">
                            <PreviewSection project={project} />
                            <MetricsSection metrics={project.metrics} />
                            <DetailsSection details={project.details} />
                            <TechStack tech={project.tech} />
                        </div>
                    </div>

                    <ModalFooter project={project} />
                </div>
            </div>
        </div>
    )
}