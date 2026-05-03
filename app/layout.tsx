import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Sura Luxury Collection | Style that speaks for you',
  description:
    'Discover curated luxury fashion pieces that bring elegance and sophistication to your wardrobe. Sura Luxury Collection offers premium clothing, accessories, and perfume for the discerning individual.',
  keywords: [
    'luxury fashion',
    'designer clothing',
    'premium bags',
    'luxury dresses',
    'Liberia',
  ],
  authors: [{ name: 'Sura Luxury Collection' }],
  openGraph: {
    title: 'Sura Luxury Collection',
    description: 'Style that speaks for you.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${playfair.variable} ${montserrat.variable} font-sans bg-white text-luxuryBlack`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
