'use client'

import CompactLayout from './layouts/CompactLayout'
import StandardLayout from './layouts/StandardLayout'

/* smart modal router - pick layout based on project properties */
export default function ProjectModal({ project, onClose, variant = 'auto' }) {
  if (!project) return null

  // auto-detect variant
  const modalVariant = variant === 'auto'
    ? detectVariant(project)
    : variant

  // route to layout
  switch (modalVariant) {
    case 'compact':
      return <CompactLayout project={project} onClose={onClose} />

    case 'standard':
    default:
      return <StandardLayout project={project} onClose={onClose} />
  }
}

/* auto-detect variant */
function detectVariant(project) {
  if (project.variant === 'compact') return 'compact'
  if (project.variant === 'full') return 'standard'

  // default: compact if minimal data
  const hasRichContent = project.details || project.features || project.metrics
  return hasRichContent ? 'standard' : 'compact'
}

// backwards compatibility
export { ProjectModal as ProjectModalWrapper }

