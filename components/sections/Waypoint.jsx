export default function Waypoint({
  id, label, annotation, meta
}) {
  return (
    <section id={id} className="py-8 md:py-10 bg-bg-primary">
      <div className="container-custom">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-text-muted">
            <span className="inline-flex w-2 h-2 rounded-full bg-rose-taupe" />
            <span>{label}</span>
          </div>

          <div className="relative flex-1 h-px" style={{ background: 'var(--border-light)' }}>
            <span
              className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase text-text-muted px-2"
              style={{ background: 'var(--bg-primary)' }}
            >
              {meta}
            </span>
          </div>

          <p className="text-[13px] md:text-[14px] text-text-muted opacity-70 leading-relaxed max-w-xl">
            {annotation}
          </p>
        </div>
      </div>
    </section>
  )
}
