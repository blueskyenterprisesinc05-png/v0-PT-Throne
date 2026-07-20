import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.woflbillion.com.ng'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Zenith Solar | Designed Around Your Energy Needs',
  description: 'Every solar system begins with understanding how you use electricity. We engineer reliable solar solutions for Nigerian homes and businesses.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Zenith Solar | Designed Around Your Energy Needs',
    description: 'Every solar system begins with understanding how you use electricity. We engineer reliable solar solutions for Nigerian homes and businesses.',
    url: '/',
    siteName: 'Zenith Solar',
    images: [
      {
        url: '/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: 'Zenith Solar | Engineering-First Solar Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zenith Solar | Designed Around Your Energy Needs',
    description: 'Every solar system begins with understanding how you use electricity. We engineer reliable solar solutions for Nigerian homes and businesses.',
    images: ['/placeholder.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}
