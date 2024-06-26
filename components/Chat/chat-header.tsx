'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/Common/button'
import { IconSeparator, IconHome } from '@/components/Common/icons'
import { UserMenu } from '@/components/Chat/chat-user-menu'
import { SidebarMobile } from '@/components/Sidebar/sidebar-mobile'
import { SidebarToggle } from '@/components/Sidebar/sidebar-toggle'
import { ChatHistory } from '@/components/Chat/chat-history'
import { useAuth } from '@/app/auth/AuthContext'

export function Header() {
  // Use a state to read the user from the context
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex justify-start w-1/4">
        <React.Suspense fallback={<div>Loading...</div>}>
          {user ? (
            <>
              <SidebarMobile>
                <ChatHistory userId={user!.uid} />
              </SidebarMobile>
              <SidebarToggle />
            </>
          ) : (
            <Link href="/" target="_blank" rel="nofollow">
              {/* <IconHome className="size-6 mr-2 dark:hidden" inverted /> */}
              <IconHome className="hidden size-6 mr-2 dark:block" />
            </Link>
          )}
          <div className="flex items-center">
            <IconSeparator className="size-6 text-muted-foreground/50" />
            {user ? (
              <UserMenu />
            ) : (
              <Button variant="link" asChild className="-ml-2">
                <Link href="/login?callbackUrl=/">Login</Link>
              </Button>
            )}
          </div>
        </React.Suspense>
      </div>
      <div className="flex justify-center w-1/2">
        <h1 className="text-3xl font-bold">TaxIntelligence</h1>{' '}
      </div>
      <div className="flex justify-end w-1/4"></div>
    </header>
  )
}
