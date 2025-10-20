'use client'

import { useModalBehaviour } from '../hooks/useModalBehaviour'
import ModalHeader from '../sections/ModalHeader'
import PreviewSection from '../sections/PreviewSection'
import MetricsSection from '../sections/MetricsSection'
import DetailsSection from '../sections/DetailsSection'
import TechStack from '../sections/TechStack'
import ModalFooter from '../sections/ModalFooter'

export default function CompactLayout({ project, onClose }) {
    const { dialogRef } = useModalBehaviour(onClose)

    return (
        <div className="fixed inset-0 z-[1000]">
            <div
                className="fixed inset-0"
                onClick={onClose}
                style={{ background: 'rgba(0, 0, 0, 0.85)' }}
            />

            <div
                ref={dialogRef}
                className="relative z-[1001] h-full flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
            >
                <div
                    className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-light)',
                        maxHeight: '85vh',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {/* Compact Header */}
                    <div className="p-6 border-b flex justify-between items-start" style={{ borderColor: 'var(--border-light)' }}>
                        <div>
                            <p className="text-xs mb-2" style={{ color: 'var(--rose-quartz)' }}>
                                {project.category?.split(',')[0].trim().toUpperCase()}
                            </p>
                            <h3 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                                {project.title}
                            </h3>
                            {project.description && (
                                <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                                    {project.description}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="text-2xl w-8 h-8 flex items-center justify-center"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            ×
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <PreviewSection project={project} />
                        <div className="mt-6">
                            <TechStack tech={project.tech} />
                        </div>
                    </div>

                    <ModalFooter project={project} />
                </div>
            </div>
        </div>
    )
}