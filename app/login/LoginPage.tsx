// 'use client'
// import * as React from 'react'
// import {
//   isSignInWithEmailLink,
//   signInWithEmailLink
// } from 'firebase/auth'
// import { getFirebaseAuth } from '../auth/firebase'
// import { appendRedirectParam } from '../../lib/redirect'
// import { useRedirect } from '../../lib/useRedirect'
// import { useRedirectParam } from '../../lib/useRedirectParam'
// import { useAuth } from '../auth/AuthContext'
// import { useRouter } from 'next/navigation';

// import { LoginHeader } from '@/components/Login/login-header';
// import { LoginFooter } from '@/components/Login/login-footer';
// import { LoginRedirecting } from '@/components/Login/login-loading';
// import { LoginMainContent } from '@/components/Login/login-main-content';
// import { useAuthHandlers } from '@/hooks/useAuthHandlers';


// export function LoginPage() {
//   const router = useRouter();
//   const [hasLogged, setHasLogged] = React.useState(false)
//   const { auth, setAuth } = useAuth()

//   const redirect = useRedirectParam()

//   useRedirect()


//   const {
//     isEmailLoading,
//     handleLoginWithEmailAndPassword,
//     emailPasswordError,
//     googleError,
//     isGoogleLoading,
//     handleLoginWithGoogle,
//     isEmailLinkLoading,
//     handleLoginWithEmailLink
//   } = useAuthHandlers(setAuth, setHasLogged);


//   async function handleLoginWithEmailLinkCallback() {
//     const auth = getFirebaseAuth()
//     if (!isSignInWithEmailLink(auth, window.location.href)) {
//       return
//     }

//     let email = window.localStorage.getItem('emailForSignIn')
//     if (!email) {
//       email = window.prompt('Please provide your email for confirmation')
//     }

//     if (!email) {
//       return
//     }

//     setHasLogged(false)

//     await signInWithEmailLink(auth, email, window.location.href)
//     window.localStorage.removeItem('emailForSignIn')

//     setHasLogged(true)
//   }

//   React.useEffect(() => {
//     handleLoginWithEmailLinkCallback()
//   }, []);


//   return (
//     <div className='flex flex-col justify-between min-h-screen'>
//       <LoginHeader />
//       {hasLogged ? (
//         <LoginRedirecting />
//       ) : (
//         <LoginMainContent
//           isEmailLoading={isEmailLoading}
//           handleLoginWithEmailAndPassword={handleLoginWithEmailAndPassword}
//           emailPasswordError={emailPasswordError}
//           googleError={googleError}
//           isGoogleLoading={isGoogleLoading}
//           handleLoginWithGoogle={handleLoginWithGoogle}
//           isEmailLinkLoading={isEmailLinkLoading}
//           handleLoginWithEmailLink={handleLoginWithEmailLink}
//           redirect={redirect}
//           appendRedirectParam={appendRedirectParam}
//         />
//       )}
//       <LoginFooter />
//     </div>
//   );
// }


'use client'
import * as React from 'react'
import { useLoadingCallback } from 'react-loading-hook'
import { getGoogleProvider, loginWithProvider } from './firebase'
import styles from './login.module.css'
import { Button } from '../../components/Button'
import { LoadingIcon } from '../../components/icons'
import Link from 'next/link'
import { PasswordForm } from '../../components/PasswordForm'
import { PasswordFormValue } from '../../components/PasswordForm/PasswordForm'
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink
} from 'firebase/auth'
import { getFirebaseAuth } from '../auth/firebase'
import { appendRedirectParam } from '../../lib/redirect'
import { useRedirect } from '../../lib/useRedirect'
import { useRedirectParam } from '../../lib/useRedirectParam'
import { useAuth } from '../auth/AuthContext'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { authConfig } from '@/config/server-config'
import { IconTaxIntelligence, IconGoogle } from '@/components/ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export function LoginPage() {
  const [hasLogged, setHasLogged] = React.useState(false)
  const { auth, setAuth } = useAuth()
  const redirect = useRedirectParam()
  useRedirect()

  const [handleLoginWithEmailAndPassword, isEmailLoading, emailPasswordError] =
    useLoadingCallback(async ({ email, password }: PasswordFormValue) => {
      setHasLogged(false)

      const auth = getFirebaseAuth()
      await signInWithEmailAndPassword(auth, email, password)
      const tokens = await getTokens(cookies(), authConfig)
      setAuth({ ...auth, tokens })

      setHasLogged(true)
    })

  const [handleLoginWithGoogle, isGoogleLoading, googleError] =
    useLoadingCallback(async () => {
      setHasLogged(false)

      const auth = getFirebaseAuth()
      await loginWithProvider(auth, getGoogleProvider(auth))

      setHasLogged(true)
    })

  const [handleLoginWithEmailLink, isEmailLinkLoading, emailLinkError] =
    useLoadingCallback(async () => {
      const auth = getFirebaseAuth()
      const email = window.prompt('Please provide your email')

      if (!email) {
        return
      }

      window.localStorage.setItem('emailForSignIn', email)
      await sendSignInLinkToEmail(auth, email, {
        url: process.env.NEXT_PUBLIC_SERVER_URL + '/login',
        handleCodeInApp: true
      })
    })

  async function handleLoginWithEmailLinkCallback() {
    const auth = getFirebaseAuth()
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      return
    }

    let email = window.localStorage.getItem('emailForSignIn')
    if (!email) {
      email = window.prompt('Please provide your email for confirmation')
    }

    if (!email) {
      return
    }

    setHasLogged(false)

    await signInWithEmailLink(auth, email, window.location.href)
    window.localStorage.removeItem('emailForSignIn')

    setHasLogged(true)
  }

  React.useEffect(() => {
    handleLoginWithEmailLinkCallback()
  }, []);


  return (
    <div className='flex flex-col justify-between min-h-screen '>
      <header>
        <div className="flex justify-center align-center bg-white pt-10">
          <IconTaxIntelligence textColor="black" size={{ width: '400', height: '90' }} />
        </div>
      </header>

      <main className="flex flex-col justify-center items-center">
        <div>  {/* TODO:main container*/}
          <section className="w-84 mx-auto">
            <div className='flex flex-col items-center my-5 p-10 pt-10 pb-6 box-content'>
              <h2 className="text-center text-[20px] leading-[1.2] md:text-[32px] md:leading-8 font-bold">
                Welcome back
              </h2>
            </div>
            <div>  {/* TODOlogin container*/}
              <div> {/* TODO Input wrapper class*/}
                <PasswordForm
                  loading={isEmailLoading}
                  onSubmit={handleLoginWithEmailAndPassword}
                  error={emailPasswordError || googleError || emailLinkError}>
                </PasswordForm>
                <Link
                  className="flex justify-end text-xs underline my-1"
                  href={appendRedirectParam('/reset-password', redirect)}
                >
                  Reset password
                </Link>

              </div>
              <div>
                <div className="divider-wrapper flex flex-row uppercase border-none text-xs font-normal m-0 p-0 pb-6 pt-3 items-center justify-center w-84 align-baseline">
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
                    onClick={handleLoginWithGoogle}
                  >
                    <span>
                      <IconGoogle />
                    </span>
                    <span>Continue with Google</span>
                  </Button>
                  <Button
                    loading={isEmailLinkLoading}
                    disabled={isEmailLinkLoading}
                    onClick={handleLoginWithEmailLink}
                  >
                    <span>
                      {/* eslint-disable-next-line */}
                      <FontAwesomeIcon icon={faEnvelope} size="lg" style={{ fontSize: '22px' }} />
                    </span>
                    <span>Continue with Email Link</span>
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

