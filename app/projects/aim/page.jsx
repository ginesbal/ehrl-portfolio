import { CaseStudyHero, CaseStudyNav, Contributions, Implementation, Overview } from '@/components/case-study/CaseStudy'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import SidebarNav from '@/components/layout/SidebarNav'
import PillCta from '@/components/ui/PillCta'
import Image from 'next/image'
import { aimData } from './data'

export const metadata = {
    title: 'aim — Focus-Session Study Planner | Ehrl Balquin',
    description: 'A calm, local-first study planner built around the focus session, in Next.js and TypeScript.',
}

export default function AimPage() {
    return (
        <div className="min-h-screen bg-bg-primary">
            <MobileNav />
            <SidebarNav />
            <main
                id="main"
                className="transition-[margin] duration-500 ease-[var(--ease-out-expo)]"
                style={{ marginLeft: 'var(--sidebar-offset, 0px)' }}
            >
                <CaseStudyHero
                    project={aimData}
                    actions={
                        <PillCta href={aimData.links.github} target="_blank" rel="noopener noreferrer" arrow="↗">View the code</PillCta>
                    }
                    aside={
                        <div className="space-y-6 max-w-2xl xl:pt-4">
                            {aimData.screenshots.map((s) => (
                                <figure key={s.src}>
                                    <a
                                        href={s.full}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${s.alt} (opens the full screenshot)`}
                                        className="block cursor-zoom-in rounded-[var(--radius-md)]"
                                    >
                                        <Image
                                            src={s.src}
                                            alt=""
                                            width={s.width}
                                            height={s.height}
                                            sizes="(min-width: 1280px) 34vw, (min-width: 768px) 672px, 100vw"
                                            className="w-full h-auto rounded-[var(--radius-md)] border border-border-light shadow-[var(--shadow-md)]"
                                        />
                                    </a>
                                    <figcaption className="mt-3 text-[13px] leading-relaxed text-text-muted">{s.caption}</figcaption>
                                </figure>
                            ))}
                        </div>
                    }
                />
                <Overview overview={aimData.overview} />
                <Implementation highlights={aimData.technicalHighlights} />
                <Contributions contributions={aimData.contributions} />
                <CaseStudyNav id={aimData.id} />
                <Footer />
            </main>
        </div>
    )
}
