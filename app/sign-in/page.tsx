import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { redirect } from 'next/navigation'
import { LoginForm } from './form'

export default async function SignInPage() {
  const session = await auth()
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }

  return (
    <div className="rounded-lg border bg-background p-8">
      <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
        <LoginForm />
      </div>
    </div>
  )
}