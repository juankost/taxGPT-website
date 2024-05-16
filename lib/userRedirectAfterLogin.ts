import { useRouter } from 'next/navigation'
import { useRedirectParam } from './useRedirectParam'

export function useRedirectAfterLogin(redirectPath: string = '/') {
  const router = useRouter()
  const redirect = useRedirectParam()

  return function () {
    router.push(redirect ?? redirectPath)
    // router.refresh()
  }
}
