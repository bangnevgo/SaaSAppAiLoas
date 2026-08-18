import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nevgo Reflect - Your Integrated Journey of Self-Discovery',
  description: 'Combine journaling, self-reflection, and manifestation in one powerful platform by Nevgo Institute',
  openGraph: {
    title: 'Nevgo Reflect - Your Integrated Journey of Self-Discovery',
    description: 'Combine journaling, self-reflection, and manifestation in one powerful platform by Nevgo Institute',
    url: 'https://app.nevgoinstitute.com',
    siteName: 'Nevgo Reflect',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nevgo Reflect - Your Integrated Journey of Self-Discovery',
    description: 'Combine journaling, self-reflection, and manifestation in one powerful platform by Nevgo Institute',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}