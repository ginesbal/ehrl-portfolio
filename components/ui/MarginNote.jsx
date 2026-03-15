export default function MarginNote({ index = '01', label = 'Section', align = 'left', offset = '-140px' }) {
    const alignmentClasses = align === 'right' ? 'items-end text-right' : 'items-start text-left'
    const positionalStyle = align === 'right' ? { right: offset } : { left: offset }

    return (
        <div
            aria-hidden
            className={`hidden lg:flex flex-col gap-2 absolute -top-2 -translate-y-1 ${alignmentClasses}`}
            style={{ minWidth: '120px', ...positionalStyle }}
        >
            <span className="text-[10px] tracking-[0.4em] uppercase text-text-muted">{index}</span>
            <span className="w-10 h-px bg-border-light" />
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-text-muted/80">
                {label}
            </span>
        </div>
    )
}
