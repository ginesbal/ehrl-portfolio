// Outlined pill with a rose arrow chip. `as` renders it as Link, <a> or <button>.
export default function PillCta({ as: Tag = 'a', arrow = '→', className = '', children, ...props }) {
    return (
        <Tag
            className={`group relative inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full border border-text-primary/15 bg-bg-primary text-text-primary hover:border-rose-taupe/60 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-taupe/40 transition-[border-color,transform] duration-300 ease-[var(--ease-out-expo)] ${className}`}
            {...props}
        >
            <span className="text-[12px] tracking-[0.22em] uppercase font-semibold">{children}</span>
            <span
                aria-hidden
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-rose-taupe text-text-light transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
            >
                <span className="inline-block text-[14px] leading-none transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-[2px]">
                    {arrow}
                </span>
            </span>
        </Tag>
    )
}
