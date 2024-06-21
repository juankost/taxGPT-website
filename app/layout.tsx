import { Toaster } from 'react-hot-toast'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/Chat/providers'
import { AuthProvider } from '@/app/auth/AuthProvider'

import { authConfig } from '@/config/server-config'
import { toUserFromToken } from '../lib/user'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'TaxIntelligence',
    template: `%s - TaxIntelligence`
  },
  description:
    'An AI-powered chatbot to help you understand the Slovenian tax law.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png'
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
  // Note, trying to get the tokens from the cookies, means the whole app will always be dynamic
  // TODO: Find a better solution that allows us to load part of the app statically
  const tokens = await getTokens(cookies(), authConfig)
  const serverUser = tokens ? toUserFromToken(tokens) : null

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
            <AuthProvider serverUser={serverUser}>
              <main className="flex flex-col flex-1 bg-muted/50">
                {children}
              </main>
            </AuthProvider>
          </div>
        </Providers>
      </body>
    </html>
  )
}
