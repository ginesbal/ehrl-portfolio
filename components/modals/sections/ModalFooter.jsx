'use client'

export default function ModalFooter({ project }) {
    // Check for demo OR github - your projects use these fields
    if (!project.github && !project.demo) return null

    return (
        <div
            className="px-8 py-5 border-t flex gap-3 flex-wrap"
            style={{
                borderColor: 'var(--border-light)',
                background: 'var(--bg-accent)'
            }}
        >
            {project.demo && (
                <ActionButton
                    href={project.demo}
                    variant="primary"
                >
                    View Live Demo
                </ActionButton>
            )}
            {project.github && (
                <ActionButton
                    href={project.github}
                    variant="secondary"
                >
                    View Source Code
                </ActionButton>
            )}
        </div>
    )
}

function ActionButton({ href, variant = 'primary', children }) {
    const isPrimary = variant === 'primary'
    
    // Handle internal routes (like /parkpal/index.html) vs external URLs
    const isExternal = href.startsWith('http')
    
    if (!isExternal) {
        // For internal demo routes, open in same tab
        return (
            <a
                href={href}
                className="flex-1 px-6 py-3 rounded-xl text-center text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={isPrimary ? {
                    background: 'var(--rose-taupe)',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(107, 79, 79, 0.25)'
                } : {
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-primary)'
                }}
            >
                {children}
            </a>
        )
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-6 py-3 rounded-xl text-center text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={isPrimary ? {
                background: 'var(--rose-taupe)',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(107, 79, 79, 0.25)'
            } : {
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)'
            }}
        >
            {children}
        </a>
    )
}