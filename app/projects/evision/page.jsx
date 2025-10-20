import Navigation from '@/components/layout/Navigation'
import Link from 'next/link'

export const metadata = {
    title: 'EVision Advisor — Ehrl Balquin',
    description: 'NLP-powered electric vehicle search platform with semantic search and intelligent caching.'
}

export default function EVisionPage() {
    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-bg-primary">
                <div className="container-custom py-20">
                    {/* Back Link */}
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 mb-12 text-text-muted hover:text-rose-taupe transition-colors"
                    >
                        <span>←</span>
                        <span className="text-sm">Back to Projects</span>
                    </Link>

                    {/* Header */}
                    <header className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 text-[10px] font-bold tracking-widest rounded-full bg-rose-taupe/10 text-rose-taupe border border-rose-taupe/20">
                                WEB DEVELOPMENT
                            </span>
                            <span className="text-xs text-text-muted">2025</span>
                        </div>

                        <h1 className="heading-xl mb-4">EVision Advisor</h1>
                        <p className="text-lg text-text-secondary max-w-3xl">
                            Browse & semantically search electric vehicles with advanced filters,
                            saved lists, intelligent caching and IP rate limiting.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <a
                                href="https://evision.up.railway.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                View Live Demo →
                            </a>
                            <a
                                href="https://github.com/ginesbal/ev_chatbotmodel"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline"
                            >
                                View Source Code
                            </a>
                        </div>
                    </header>

                    {/* Preview */}
                    <section className="mb-16">
                        <div className="rounded-2xl overflow-hidden border border-border-light bg-bg-accent">
                            <div className="aspect-video relative">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'linear-gradient(135deg, #111827, #4b5563)'
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <div className="text-6xl mb-4 font-light">EVision</div>
                                        <p className="text-sm opacity-80">Smart EV Search Platform</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Tech Stack */}
                    <section className="mb-16">
                        <h2 className="text-xs font-bold tracking-widest mb-6 text-text-muted">
                            TECHNOLOGY STACK
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {['FastAPI', 'Python', 'Sentence-Transformers', 'Railway', 'Jinja2'].map(tech => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 text-sm rounded-full border border-border-light bg-bg-accent text-text-secondary"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Features */}
                    <section className="mb-16">
                        <h2 className="text-xs font-bold tracking-widest mb-6 text-text-muted">
                            KEY FEATURES
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-xl border border-border-light bg-bg-accent">
                                <h3 className="font-semibold mb-2 text-text-primary">Semantic Search</h3>
                                <p className="text-sm text-text-secondary">
                                    Natural language processing with intelligent keyword fallback
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-border-light bg-bg-accent">
                                <h3 className="font-semibold mb-2 text-text-primary">Advanced Filtering</h3>
                                <p className="text-sm text-text-secondary">
                                    Filter by price, range, body type, drivetrain, and seating
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-border-light bg-bg-accent">
                                <h3 className="font-semibold mb-2 text-text-primary">Performance</h3>
                                <p className="text-sm text-text-secondary">
                                    In-memory caching and IP rate limiting for optimal speed
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Project Navigation */}
                    <div className="pt-16 border-t border-border-light grid md:grid-cols-2 gap-4">
                        <Link
                            href="/projects/parkpal"
                            className="group flex items-center justify-between p-6 rounded-xl border border-border-light hover:border-rose-taupe transition-all"
                        >
                            <span className="text-2xl text-rose-taupe group-hover:-translate-x-2 transition-transform">
                                ←
                            </span>
                            <div className="text-right">
                                <p className="text-xs text-text-muted mb-2">PREVIOUS PROJECT</p>
                                <p className="text-lg font-semibold text-text-primary group-hover:text-rose-taupe transition-colors">
                                    ParkPal
                                </p>
                            </div>
                        </Link>

                        <Link
                            href="/projects"
                            className="group flex items-center justify-between p-6 rounded-xl border border-border-light hover:border-rose-taupe transition-all"
                        >
                            <div>
                                <p className="text-xs text-text-muted mb-2">ALL PROJECTS</p>
                                <p className="text-lg font-semibold text-text-primary group-hover:text-rose-taupe transition-colors">
                                    View All
                                </p>
                            </div>
                            <span className="text-2xl text-rose-taupe group-hover:translate-x-2 transition-transform">
                                →
                            </span>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}