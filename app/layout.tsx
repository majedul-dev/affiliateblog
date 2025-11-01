import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'AffiliateBlog - Product Reviews and Recommendations',
    template: '%s | AffiliateBlog',
  },
  description: 'Find the best products and honest reviews with our comprehensive buying guides.',
  keywords: ['product reviews', 'affiliate', 'recommendations', 'buying guides'],
  authors: [{ name: 'AffiliateBlog' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.com',
    siteName: 'AffiliateBlog',
    title: 'AffiliateBlog - Product Reviews and Recommendations',
    description: 'Find the best products and honest reviews with our comprehensive buying guides.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AffiliateBlog - Product Reviews and Recommendations',
    description: 'Find the best products and honest reviews with our comprehensive buying guides.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
