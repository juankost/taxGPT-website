import React from 'react'
import { PasswordForm } from '@/components/PasswordForm/PasswordForm'
import { Button } from '@/components/Button/button'
import { IconGoogle } from '@/components/Common/icons'

interface RegisterMainContentProps {
  registerWithEmailAndPassword: (value: any) => void
  isRegisterLoading: boolean
  error: any
  handleRegisterWithGoogle: () => void
  isGoogleLoading: boolean
}

const RegisterMainContent: React.FC<RegisterMainContentProps> = ({
  registerWithEmailAndPassword,
  isRegisterLoading,
  error,
  handleRegisterWithGoogle,
  isGoogleLoading
}) => {
  return (
    <main className="flex flex-col justify-center items-center">
      <section className="w-84 mx-auto">
        <div className="flex flex-col items-center my-5 p-10 pb-6 box-content">
          <h2 className="text-center text-[20px] leading-[1.2] md:text-[32px] md:leading-8 font-bold">
            Create an account
          </h2>
        </div>
        <div>
          <PasswordForm
            onSubmit={registerWithEmailAndPassword}
            loading={isRegisterLoading}
            error={error}
          />
          <div className="divider-wrapper flex flex-row uppercase border-none text-xs font-normal m-0 p-0 py-6 items-center justify-center w-84 align-baseline">
            <hr className="flex-auto border-b border-gray-300 mr-2 my-0" />
            <span>Or</span>
            <hr className="flex-auto border-b border-gray-300 ml-2 my-0" />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Button
              loading={isGoogleLoading}
              disabled={isGoogleLoading}
              onClick={handleRegisterWithGoogle}
            >
              <span>
                <IconGoogle />
              </span>
              <span>Continue with Google</span>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export { RegisterMainContent }
