import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '../app/auth/AuthContext'
import { useRedirectParam } from './useRedirectParam'

export function useRedirect() {
  const router = useRouter()
  const { user } = useAuth()
  const redirect = useRedirectParam()

  console.log('redirect', redirect)
  console.log('user', user)

  useEffect(() => {
    if (!user) {
      return
    }

    router.push(redirect ?? '/')
  }, [user, router, redirect])
}