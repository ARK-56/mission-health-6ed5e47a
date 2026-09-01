import { Analytics } from '@vercel/analytics/next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const careSans = DM_Sans({ subsets: ['latin'], variable: '--font-care-sans' })
const careSerif = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-care-serif', weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Mission Primary Care | Care for your whole health',
  description: 'Thoughtful primary care, preventive health, and wellness support for every season of life.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8f9f6',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${careSans.variable} ${careSerif.variable} bg-background`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
