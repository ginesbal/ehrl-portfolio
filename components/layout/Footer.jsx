'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white py-12 border-t" style={{ borderColor: 'var(--border-light)' }}>
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* logo & copyright */}
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Home" className="flex items-center group">
              <div
                className="
                  w-10 h-10 rounded-full border-2 flex items-center justify-center
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:shadow-md
                  group-hover:bg-[var(--rose-taupe)]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rose-taupe)]
                "
                style={{ borderColor: 'var(--rose-taupe)' }}
              >
                <span className="text-[14px] font-medium transition-colors duration-300 text-[var(--text-primary)] group-hover:text-white">
                  eb
                </span>
              </div>
            </Link>

            <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              <p className="transition-all duration-300 hover:text-[var(--rose-taupe)] hover:font-medium cursor-default">© 2025 Ehrl Balquin</p>
              <p className="transition-all duration-300 hover:text-[var(--rose-quartz)] hover:font-medium cursor-default">Calgary, AB</p>
            </div>
          </div>

          {/* social links */}
          <div className="flex gap-3">
            {/* Email - Rose Taupe */}
            <a
              href="mailto:ehrl.balquin@gmail.com"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
              style={{
                background: 'var(--bg-accent)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#6b4f4f'
                e.currentTarget.style.borderColor = '#6b4f4f'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-accent)'
                e.currentTarget.style.borderColor = 'var(--border-light)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </a>

            {/* LinkedIn - Blue */}
            <a
              href="https://linkedin.com/in/ehrlbalquin"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
              style={{
                background: 'var(--bg-accent)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0077B5'
                e.currentTarget.style.borderColor = '#0077B5'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-accent)'
                e.currentTarget.style.borderColor = 'var(--border-light)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8" cy="8" r="1" fill="currentColor" />
                <path d="M7 11v6M11 17v-4a2 2 0 1 1 4 0v4" />
              </svg>
            </a>

            {/* GitHub - Dark */}
            <a
              href="https://github.com/ehrlbalquin"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
              style={{
                background: 'var(--bg-accent)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1f20'
                e.currentTarget.style.borderColor = '#1a1f20'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-accent)'
                e.currentTarget.style.borderColor = 'var(--border-light)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.19-3.37-1.19-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.9 1.54 2.36 1.1 2.94.84.09-.66.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .85-.27 2.8 1.03A9.7 9.7 0 0 1 12 6.8c.86 0 1.73.12 2.54.36 1.95-1.3 2.8-1.03 2.8-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.83-2.34 4.67-4.57 4.92.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
