// Shared building blocks for /projects/[id] case studies.
import { projects } from '@/data/portfolio-data'
import Image from 'next/image'
import Link from 'next/link'

const label = 'text-[11px] tracking-[0.2em] uppercase text-text-muted'

function Section({ title, children }) {
    return (
        <section className="py-16 md:py-24 border-t border-border-light">
            <div className="container-custom">
                <div className="flex items-center gap-4 mb-10 md:mb-14">
                    <span aria-hidden className="w-2 h-2 rounded-full bg-rose-taupe" />
                    <h2 className="shrink-0 text-[11px] tracking-[0.3em] uppercase text-text-muted">{title}</h2>
                    <span aria-hidden className="h-px flex-1 bg-border-light" />
                </div>
                {children}
            </div>
        </section>
    )
}

// `backticks` in the data mark code identifiers
function Rich({ text }) {
    return text.split(/`([^`]+)`/).map((part, i) =>
        i % 2 ? <code key={i} className="font-mono text-[0.88em] text-text-primary">{part}</code> : part
    )
}

export function TextLink({ className = '', children, ...props }) {
    return (
        <a
            className={`inline-flex items-center min-h-[44px] text-[12px] tracking-[0.22em] uppercase font-semibold text-text-primary underline decoration-border-light decoration-1 underline-offset-[6px] hover:text-rose-taupe hover:decoration-rose-taupe ${className}`}
            {...props}
        >
            {children}
        </a>
    )
}

export function CaseStudyHero({ project, actions, aside }) {
    const meta = projects.find((p) => p.id === project.id)

    return (
        <section className="bg-bg-primary">
            <div className="container-custom pt-28 pb-16 md:pb-24">
                <div className={aside ? 'grid xl:grid-cols-[1.15fr_0.85fr] gap-14 xl:gap-20 items-start' : ''}>
                    <div className="max-w-2xl">
                        {meta && (
                            <div className="flex items-center gap-4 mb-6 text-[11px] tracking-[0.3em] uppercase text-text-muted">
                                <span aria-hidden className="w-2 h-2 rounded-full bg-rose-taupe" />
                                <span>{meta.category.split(',')[0]}</span>
                                <span aria-hidden className="h-px w-12 bg-border-light" />
                                <span className="tabular-nums">{meta.year}</span>
                            </div>
                        )}

                        <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] font-normal leading-[0.95] tracking-[-0.02em] text-text-primary">
                            {project.title}<span className="italic text-rose-taupe">.</span>
                        </h1>

                        <p className="mt-6 md:mt-8 max-w-xl text-[17px] md:text-[19px] leading-relaxed text-text-secondary">
                            {project.description}
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">{actions}</div>

                        {/* each column is a subgrid, so a label that wraps keeps every value on one line */}
                        <dl className="mt-14 md:mt-16 grid grid-cols-3 border-t border-border-light">
                            {project.metrics.map((m) => (
                                <div key={m.label} className="row-span-3 grid grid-rows-subgrid content-start pt-5 pr-3 pl-4 first:pl-0 border-l border-border-light first:border-l-0">
                                    <dt className={label}>{m.label}</dt>
                                    <dd className="mt-2 font-serif text-[clamp(1.5rem,3.2vw,2.25rem)] leading-none tabular-nums text-text-primary">
                                        {m.value}
                                    </dd>
                                    {m.detail && <dd className="mt-2 text-[13px] leading-snug text-text-muted">{m.detail}</dd>}
                                </div>
                            ))}
                        </dl>
                    </div>

                    {aside}
                </div>
            </div>
        </section>
    )
}

export function Overview({ overview }) {
    const [lede, ...rest] = overview.summary

    return (
        <Section title="Overview">
            <p className="max-w-3xl font-serif text-[clamp(1.25rem,2.4vw,1.875rem)] leading-[1.35] text-text-primary">{lede}</p>
            {rest.map((p) => (
                <p key={p} className="mt-6 max-w-2xl text-[17px] leading-relaxed text-text-secondary">{p}</p>
            ))}
        </Section>
    )
}

// One real piece of the work beside the highlight it supports: verbatim code, or a screenshot.
function Figure({ figure, className }) {
    const caption = <figcaption className="mt-3 text-[13px] leading-relaxed text-text-muted">{figure.caption}</figcaption>

    if (figure.code) {
        return (
            <figure className={className}>
                {/* focusable so it can be scrolled by keyboard if a narrow screen ever needs it */}
                <pre tabIndex={0} className="overflow-x-auto rounded-[var(--radius-lg)] border border-border-light bg-bg-secondary p-4 md:p-5 font-mono text-[11.5px] md:text-[12.5px] leading-[1.6] text-text-primary">
                    <code>{figure.code}</code>
                </pre>
                {caption}
            </figure>
        )
    }

    const image = (
        <Image
            src={figure.src}
            alt={figure.full ? '' : figure.alt}
            width={figure.width}
            height={figure.height}
            sizes={figure.phone ? '280px' : '(min-width: 1280px) 400px, (min-width: 768px) 640px, 100vw'}
            className="w-full h-auto rounded-[var(--radius-md)] border border-border-light shadow-[var(--shadow-md)]"
        />
    )

    return (
        <figure className={`${figure.phone ? 'max-w-[17.5rem]' : ''} ${className}`}>
            {figure.full ? (
                <a
                    href={figure.full}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${figure.alt} (opens the full screenshot)`}
                    className="block cursor-zoom-in rounded-[var(--radius-md)]"
                >
                    {image}
                </a>
            ) : image}
            {caption}
        </figure>
    )
}

export function Implementation({ highlights }) {
    const text = 'max-w-[62ch] text-[15px] leading-relaxed'

    return (
        <Section title="Technical implementation">
            <ol className="space-y-14 md:space-y-20">
                {highlights.map((item, i) => (
                    <li
                        key={item.title}
                        className={`grid md:grid-cols-[4.5rem_minmax(0,1fr)] gap-3 md:gap-x-8 ${item.figure ? 'xl:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,25rem)]' : ''}`}
                    >
                        <span aria-hidden className="font-serif text-[32px] md:text-[44px] leading-none tabular-nums text-text-muted/40">
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                            <h3 className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-text-primary">{item.title}</h3>
                            <p className={`mt-5 ${text} text-text-secondary`}><Rich text={item.body} /></p>
                            {item.outcome && <p className={`mt-4 ${text} font-medium text-text-primary`}><Rich text={item.outcome} /></p>}
                            {item.tradeoff && (
                                <p className="mt-4 max-w-[62ch] text-[14px] leading-relaxed text-text-muted">
                                    <span className={`${label} mr-2.5`}>Trade-off</span>
                                    <Rich text={item.tradeoff} />
                                </p>
                            )}
                        </div>
                        {item.figure && (
                            <Figure figure={item.figure} className="mt-8 md:col-start-2 xl:col-start-3 xl:row-start-1 xl:mt-0 xl:self-start" />
                        )}
                    </li>
                ))}
            </ol>
        </Section>
    )
}

export function CaseStudyNav({ id }) {
    const i = projects.findIndex((p) => p.id === id)
    const all = { href: '/projects', eyebrow: 'Back to', title: 'All projects' }
    const prev = projects[i - 1]
    const next = projects[i + 1]
    const sides = [
        prev ? { href: `/projects/${prev.id}`, eyebrow: 'Previous', title: prev.title } : all,
        next ? { href: `/projects/${next.id}`, eyebrow: 'Next project', title: next.title } : all,
    ]

    return (
        <nav aria-label="Projects" className="border-t border-border-light">
            <div className="container-custom grid grid-cols-2 gap-6 py-12 md:py-16">
                {sides.map(({ href, eyebrow, title }, side) => (
                    <Link
                        key={side}
                        href={href}
                        className={`group flex flex-col gap-2 ${side ? 'items-end text-right' : 'items-start'}`}
                    >
                        <span className={label}>
                            {side ? `${eyebrow} →` : `← ${eyebrow}`}
                        </span>
                        <span className="font-serif text-[clamp(1.5rem,3.5vw,2.5rem)] leading-tight text-text-primary transition-colors group-hover:text-rose-taupe">
                            {title}
                        </span>
                    </Link>
                ))}
            </div>
        </nav>
    )
}
