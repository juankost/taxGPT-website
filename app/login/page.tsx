import { LoginPage as ClientLoginPage } from './LoginPage'

export default function Login() {
  return (
    <div className="rounded-lg border bg-background p-8">
      <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
        <ClientLoginPage />
      </div>
    </div>
  )
}
