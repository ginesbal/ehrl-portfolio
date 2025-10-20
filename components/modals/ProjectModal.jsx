'use client'

import CompactLayout from './layouts/CompactLayout'
import StandardLayout from './layouts/StandardLayout'

/**
 * Smart Modal Router
 * Decides which layout to use based on project properties
 */
export default function ProjectModal({ project, onClose, variant = 'auto' }) {
  if (!project) return null

  // Auto-detect variant if not specified
  const modalVariant = variant === 'auto'
    ? detectVariant(project)
    : variant

  // Route to appropriate layout
  switch (modalVariant) {
    case 'compact':
      return <CompactLayout project={project} onClose={onClose} />

    case 'standard':
    default:
      return <StandardLayout project={project} onClose={onClose} />
  }
}

/**
 * Auto-detect which variant to use
 */
function detectVariant(project) {
  if (project.variant === 'compact') return 'compact'
  if (project.variant === 'full') return 'standard'

  // Default logic: compact if minimal data, standard otherwise
  const hasRichContent = project.details || project.features || project.metrics
  return hasRichContent ? 'standard' : 'compact'
}

// Backwards compatibility
export { ProjectModal as ProjectModalWrapper }
