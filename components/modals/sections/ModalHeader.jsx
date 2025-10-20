'use client'

export default function ModalHeader({ project, onClose, showProgress = true, scrollProgress = 0 }) {
  return (
    <div 
      className="relative px-8 py-6 border-b"
      style={{ borderColor: 'var(--border-light)' }}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <CategoryBadge category={project.category} />
            {project.year && (
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {project.year}
              </span>
            )}
          </div>
          <h2 
            id="modal-title"
            className="text-3xl font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {project.title}
          </h2>
          {project.subtitle && (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {project.subtitle}
            </p>
          )}
        </div>

        <CloseButton onClick={onClose} />
      </div>

      {/* Progress indicator */}
      {showProgress && (
        <div 
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-150"
          style={{
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, var(--rose-taupe), var(--rose-quartz))'
          }}
        />
      )}
    </div>
  )
}

function CategoryBadge({ category }) {
  const primaryCategory = category?.split(',')[0].trim() || 'PROJECT'
  
  return (
    <span 
      className="text-[10px] font-bold tracking-widest px-3 py-1 rounded-full"
      style={{
        background: 'rgba(229, 152, 155, 0.12)',
        color: 'var(--rose-quartz)',
        border: '1px solid rgba(229, 152, 155, 0.25)'
      }}
    >
      {primaryCategory.toUpperCase()}
    </span>
  )
}

function CloseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close modal"
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
      style={{
        background: 'var(--bg-accent)',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border-light)'
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  )
}