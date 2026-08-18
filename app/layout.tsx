import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Farah Affes — English Educator & DIY Learning Material Designer',
  description:
    'Empowering learners through interactive English education and creative DIY materials. Explore posters, workshops, printable resources, and handmade classroom props to buy or rent.',
  keywords: [
    'English teacher',
    'educational content designer',
    'DIY classroom props',
    'printable worksheets',
    'phonics',
    'ESL resources',
  ],
  authors: [{ name: 'Farah Affes' }],
  openGraph: {
    title: 'Farah Affes — English Educator & DIY Learning Material Designer',
    description:
      'Interactive English education and creative DIY materials for students, parents, and teachers.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F7C948',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable} bg-background`}>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
