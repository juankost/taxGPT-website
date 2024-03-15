import { RegisterPage } from './RegisterPage'

export default function Register() {
  return (
    <div className="rounded-lg border bg-background p-8">
      <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
        <RegisterPage />
      </div>
    </div>
  )
}
