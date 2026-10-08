// app/layout.jsx
import Providers from '@/components/Providers.jsx'
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

// Defaults; pages with their own metadata (the case studies, /projects) replace them,
// so each route has exactly one <title> and description.
export const metadata = {
  title: 'Ehrl Balquin - Portfolio',
  description: 'Ehrl Balquin, full-stack developer in Calgary. Selected work, background, and contact.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sourceSans.variable} ${sourceSerif.variable}`}>
      <head>
        {/* Strip homepage hash on hard refresh only */}
        <Script id="strip-home-hash-on-reload" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var nav = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || null;
                var isReload = nav ? nav.type === 'reload' : (performance.navigation && performance.navigation.type === 1);
                if (
                  isReload &&
                  location.pathname === '/' &&
                  /^(#about|#projects|#contact)$/i.test(location.hash)
                ) {
                  history.replaceState(null, '', '/');
                  window.scrollTo(0, 0);
                }
              } catch (e) {}
            })();
          `}
        </Script>
      </head>
      <body className={sourceSans.className} suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-bg-dark focus:px-5 focus:py-3 focus:text-[14px] focus:font-semibold focus:text-text-light"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
