import './globals.css'
import { Toaster } from 'react-hot-toast'
import SessionProvider from '@/components/SessionProvider'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Royal Palace Marriage Hall & Garden | Premium Wedding Venue',
    template: '%s | Royal Palace Marriage Hall',
  },
  description: 'Royal Palace Marriage Hall & Garden - The premier wedding venue for your special celebrations. Weddings, Receptions, Engagements, Parties.',
  keywords: ['marriage hall', 'wedding venue', 'garden venue', 'banquet hall'],
  openGraph: {
    title: 'Royal Palace Marriage Hall & Garden',
    description: 'Where Dreams Become Memories - Premium Wedding Venue',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body>
        <SessionProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: '#1a1a2e', color: '#fdf8f0', border: '1px solid #e8a413' },
              success: { iconTheme: { primary: '#e8a413', secondary: '#1a1a2e' } },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  )
}
