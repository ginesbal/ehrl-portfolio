'use client'

// app/layout.jsx
import ErrorBoundary from '@/components/ui/ErrorBoundary.jsx'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Ehrl Balquin - Portfolio</title>
        <meta name="description" content="Junior Software Developer Portfolio" />
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
      <body className={inter.className} suppressHydrationWarning>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
