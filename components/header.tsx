import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconNextChat, IconSeparator } from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { authConfig } from '@/config/server-config'
import { toSession } from '@/lib/user'

async function UserOrLogin() {
  const tokens = await getTokens(cookies(), authConfig)
  if (!tokens?.decodedToken.user_id) {
    return null
  }
  const session = toSession(tokens)

  return (
    <>
      {session.user.id ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={tokens?.decodedToken.user_id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/" target="_blank" rel="nofollow">
          <IconNextChat className="size-6 mr-2 dark:hidden" inverted />
          <IconNextChat className="hidden size-6 mr-2 dark:block" />
        </Link>
      )}
      <div className="flex items-center">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        {session ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login?callbackUrl=/">Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex justify-start w-1/4">
        <React.Suspense fallback={<div>Loading...</div>}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex justify-center w-1/2">
        <h1 className="text-3xl font-bold">TaxIntelligence</h1>{' '}
        {/* Adjust text size as needed */}
      </div>
      <div className="flex justify-end w-1/4">
        {/* Placeholder for balance, can put other elements if needed */}
      </div>
    </header>
  )
}
