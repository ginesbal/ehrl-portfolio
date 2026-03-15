'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-bg-primary py-8 border-t border-border-light">
      <div className="container-custom">
        <div className="flex flex-row md:flex-row items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-2 border-rose-taupe transition-all duration-500 group-hover:scale-110" />
              <div className="absolute inset-[3px] rounded-full bg-bg-primary flex items-center justify-center transition-all duration-300 group-hover:bg-rose-taupe">
                <span className="text-[12px] font-bold text-rose-taupe group-hover:text-white transition-colors duration-300">eb</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-6 text-[13px] text-text-muted">
            <a href="mailto:ehrlbalquin@gmail.com" className="hover:text-rose-taupe transition-colors">Email</a>
            <a href="https://linkedin.com/in/ehrlbalquin" target="_blank" rel="noopener noreferrer" className="hover:text-rose-taupe transition-colors">LinkedIn</a>
            <a href="https://github.com/ginesbal" target="_blank" rel="noopener noreferrer" className="hover:text-rose-taupe transition-colors">GitHub</a>
            <span className="text-text-muted/50">—</span>
            <span className="text-[12px]">© 2025</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
