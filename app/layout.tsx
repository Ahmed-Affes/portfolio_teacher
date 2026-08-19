import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fredoka, Patrick_Hand, Plus_Jakarta_Sans } from 'next/font/google'
import { Providers } from '@/components/providers'
import { CuteCursor } from '@/components/cute-cursor'
import { ScrollPaperPlane } from '@/components/scroll-paper-plane'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  variable: '--font-hand',
  weight: ['400'],
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
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
  themeColor: '#FFC837',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${patrickHand.variable} ${jakarta.variable} bg-background`}
    >
      <body className="font-sans antialiased text-foreground bg-background selection:bg-[#FFC837] selection:text-[#2D1F1D]">
        <CuteCursor />
        <ScrollPaperPlane />
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

