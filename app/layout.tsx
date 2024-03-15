import { Toaster } from 'react-hot-toast'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims'
import { Tokens, getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { User } from '@/app/auth/AuthContext'
import { AuthProvider } from '@/app/auth/AuthProvider'
import { authConfig } from '@/config/server-config'
import { toUser } from '../lib/user'

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'TaxIntelligence Chatbot',
    template: `%s - AI Chatbot`
  },
  description: 'An AI-powered chatbot to help you understand the tax law.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const tokens = await getTokens(cookies(), authConfig)
  const user = tokens ? toUser(tokens) : null

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <Toaster />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <AuthProvider serverUser={user}>
              <Header />
              <main className="flex flex-col flex-1 bg-muted/50">
                {children}
              </main>
            </AuthProvider>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
