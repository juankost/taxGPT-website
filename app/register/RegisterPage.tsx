'use client'

import * as React from 'react'
import { useLoadingCallback } from 'react-loading-hook'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth'
import { getFirebaseAuth } from '../auth/firebase'
import { Button } from '../../components/Button'
import { PasswordForm } from '../../components/PasswordForm'
import { PasswordFormValue } from '../../components/PasswordForm/PasswordForm'
import { useRedirectParam } from '../../lib/useRedirectParam'
import { useRedirect } from '../../lib/useRedirect'
import { IconTaxIntelligence, IconGoogle } from '@/components/ui/icons';
import { getGoogleProvider, loginWithProvider } from './firebase'

export function RegisterPage() {
  const [hasLogged, setHasLogged] = React.useState(false)
  const redirect = useRedirectParam()

  useRedirect()

  const [registerWithEmailAndPassword, isRegisterLoading, error] =
    useLoadingCallback(async ({ email, password }: PasswordFormValue) => {
      setHasLogged(false)
      const auth = getFirebaseAuth()
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await sendEmailVerification(credential.user)

      setHasLogged(true)
    })

  const [handleRegisterWithGoogle, isGoogleLoading, googleError] =
    useLoadingCallback(async () => {
      setHasLogged(false)

      const auth = getFirebaseAuth()
      await loginWithProvider(auth, getGoogleProvider(auth))

      setHasLogged(true)
    })
  return (
    <div className='flex flex-col justify-between min-h-screen '>
      <header>
        <div className="flex justify-center align-center bg-white pt-10">
          <IconTaxIntelligence textColor="black" size={{ width: '400', height: '90' }} />
        </div>
      </header>

      <main className="flex flex-col justify-center items-center">
        <div>  {/* TODO:main container*/}
          <section className="w-84 mx-auto">  {/* Fixed width of 24rem (384px) and centered */}
            <div className='flex flex-col items-center my-5 p-10 pt-10 pb-6 box-content'>
              <h2 className="text-center text-[20px] leading-[1.2] md:text-[32px] md:leading-8 font-bold">
                Create an account
              </h2>
            </div>
            <div>
              <div>
                <PasswordForm
                  onSubmit={registerWithEmailAndPassword}
                  loading={isRegisterLoading}
                  error={error}
                >
                </PasswordForm>
              </div>
              <div>
                <div className="divider-wrapper flex flex-row uppercase border-none text-xs font-normal m-0 p-0 pb-6 pt-6 items-center justify-center w-84 align-baseline">
                  <hr className="flex-auto border-b border-gray-300 mr-2 my-0" />
                  <span>Or</span>
                  <hr className="flex-auto border-b border-gray-300 ml-2 my-0" />
                </div>
              </div>
              <div>
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
            </div>
          </section>
        </div>
      </main >
      <footer className="text-center text-sm flex items-center justify-center text-gray-500 py-3 px-0">
        <div className='items-center flex gap-3 py-0 text-xs text-token-text-tertiary'>
          <a href="#" className="cursor-pointer font-normal underline">Terms of Use</a>
          <span className="text-token-text-tertiary">|</span>
          <a href="#" className="cursor-pointer font-normal underline">Privacy Policy</a>
        </div>
      </footer>
    </div >
  )
}
