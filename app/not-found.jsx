import { TextLink } from '@/components/case-study/CaseStudy'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import SidebarNav from '@/components/layout/SidebarNav'
import PillCta from '@/components/ui/PillCta'
import Link from 'next/link'

export const metadata = {
    title: 'Page not found | Ehrl Balquin',
}

export default function NotFound() {
    return (
        <div className="min-h-screen bg-bg-primary">
            <MobileNav />
            <SidebarNav />
            <main
                id="main"
                className="transition-[margin] duration-500 ease-[var(--ease-out-expo)]"
                style={{ marginLeft: 'var(--sidebar-offset, 0px)' }}
            >
                <section className="container-custom pt-32 pb-24 md:pb-32 min-h-[70vh]">
                    <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] font-normal leading-[0.95] tracking-[-0.02em] text-text-primary">
                        Page not found<span className="italic text-rose-taupe">.</span>
                    </h1>
                    <p className="mt-6 md:mt-8 max-w-xl text-[17px] md:text-[19px] leading-relaxed text-text-secondary">
                        There is nothing at this address. It may have moved, or the link may be mistyped.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                        <PillCta as={Link} href="/">Back to home</PillCta>
                        <TextLink href="/projects">Selected work</TextLink>
                    </div>
                </section>
                <Footer />
            </main>
        </div>
    )
}
