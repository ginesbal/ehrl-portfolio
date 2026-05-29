'use client'
import Link from 'next/link'

export default function ProjectNavigation() {
    return (
        <section className="py-16 border-t-2 border-border-light" style={{ background: 'var(--bg-primary)' }}>
            <div className="container-custom">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center">
                        <Link
                            href="/projects/aim"
                            className="group flex items-center gap-2.5 transition-opacity hover:opacity-50"
                        >
                            <span className="text-lg text-text-muted font-bold">←</span>
                            <span className="text-sm text-text-secondary font-semibold">Previous: aim</span>
                        </Link>

                        <Link
                            href="/projects/parkpal"
                            className="group flex items-center gap-2.5 transition-opacity hover:opacity-50"
                        >
                            <span className="text-sm text-text-secondary font-semibold">Next: ParkPal</span>
                            <span className="text-lg text-text-muted font-bold">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
