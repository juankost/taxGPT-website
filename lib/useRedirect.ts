import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '../app/auth/AuthContext'
import { useRedirectParam } from './useRedirectParam'

export function useRedirect(redirectPath: string = '/') {
  const router = useRouter()
  const { user } = useAuth()
  const redirect = useRedirectParam()

  useEffect(() => {
    if (!user) {
      return
    }
    router.push(redirect ?? redirectPath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router, redirect])
}
