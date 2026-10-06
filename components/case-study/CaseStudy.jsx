// Shared building blocks for /projects/[id] case studies.
import { projects } from '@/data/portfolio-data'
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

function Bullets({ items }) {
    return (
        <ul className="space-y-2.5">
            {items.map((item) => (
                <li key={item} className="relative pl-5 text-[15px] leading-relaxed text-text-secondary before:content-['–'] before:absolute before:left-0 before:text-text-muted/60">
                    {item}
                </li>
            ))}
        </ul>
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
                <div className={aside ? 'grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-20 items-start' : ''}>
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

                        <dl className="mt-14 md:mt-16 grid grid-cols-3 border-t border-border-light">
                            {project.metrics.map((m) => (
                                <div key={m.label} className="pt-5 pr-3 pl-4 first:pl-0 border-l border-border-light first:border-l-0">
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

            <div className="mt-14 md:mt-16 grid md:grid-cols-2 gap-10 md:gap-16">
                {[['Technical focus', overview.technicalFocus], ['Core features', overview.coreFeatures]].map(([title, items]) => (
                    <div key={title}>
                        <h3 className={`${label} pb-3 mb-5 border-b border-border-light`}>{title}</h3>
                        <Bullets items={items} />
                    </div>
                ))}
            </div>
        </Section>
    )
}

export function Implementation({ highlights }) {
    const rows = [
        ['Challenge', 'challenge', 'text-text-secondary'],
        ['Approach', 'approach', 'text-text-secondary'],
        ['Result', 'outcome', 'text-text-primary font-medium'],
    ]

    return (
        <Section title="Technical implementation">
            <ol className="space-y-14 md:space-y-20">
                {highlights.map((item, i) => (
                    <li key={item.title} className="grid md:grid-cols-[4.5rem_1fr] gap-3 md:gap-8">
                        <span aria-hidden className="font-serif text-[32px] md:text-[44px] leading-none tabular-nums text-text-muted/40">
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                            <h3 className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-text-primary">{item.title}</h3>
                            <dl className="mt-6 grid sm:grid-cols-[7rem_1fr] gap-x-6 sm:gap-y-5 max-w-3xl">
                                {rows.map(([name, key, tone]) => (
                                    <div key={key} className="contents">
                                        <dt className={`${label} sm:pt-1 ${key === 'outcome' ? '!text-rose-taupe' : ''}`}>{name}</dt>
                                        <dd className={`mt-1 mb-5 sm:m-0 text-[15px] leading-relaxed ${tone}`}>{item[key]}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </li>
                ))}
            </ol>
        </Section>
    )
}

export function Contributions({ contributions }) {
    return (
        <Section title="My contributions">
            <div className="divide-y divide-border-light">
                {contributions.map((group) => (
                    <div key={group.category} className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4 md:gap-12 py-8 first:pt-0 last:pb-0">
                        <h3 className="font-serif text-[22px] md:text-[24px] leading-snug text-text-primary">{group.category}</h3>
                        <Bullets items={group.items} />
                    </div>
                ))}
            </div>
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
