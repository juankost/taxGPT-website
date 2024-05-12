'use client'
import Image from 'next/image'
import * as React from 'react'
import { Button } from '@/components/Common/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/Common/dropdown-menu'
import { useLoadingCallback } from 'react-loading-hook'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { getFirebaseAuth } from '@/app/auth/firebase'
import { useAuth } from '@/app/auth/AuthContext'

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

// export function UserMenu(userData: User) {
export function UserMenu() {
  const { user, setUser } = useAuth()
  const router = useRouter()
  const [hasLoggedOut, setHasLoggedOut] = React.useState(false)
  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth()
    await signOut(auth)
    setHasLoggedOut(true)
    setUser(null)
  })

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-0">
            {user?.photoURL ? (
              <Image
                className="size-6 transition-opacity duration-300 rounded-full select-none ring-1 ring-zinc-100/10 hover:opacity-80"
                src={user?.photoURL ? `${user.photoURL}` : ''}
                alt={user.displayName ?? 'Avatar'}
                height={48}
                width={48}
              />
            ) : (
              <div className="flex items-center justify-center text-xs font-medium uppercase rounded-full select-none size-7 shrink-0 bg-muted/50 text-muted-foreground">
                {user?.displayName ? getUserInitials(user?.displayName) : null}
              </div>
            )}
            <span className="ml-2">{user?.displayName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-[180px]">
          <DropdownMenuItem className="flex-col items-start">
            <div className="text-xs font-medium">{user?.displayName}</div>
            <div className="text-xs text-zinc-500">{user?.email}</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-xs">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
