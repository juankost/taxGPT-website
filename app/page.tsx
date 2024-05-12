'use client'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LoadingIcon } from '@/components/Icons'
import { nanoid } from 'nanoid'
import { IconTaxIntelligence } from '@/components/Common/icons'

const Home: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState({ login: false, register: false })

  const handleRedirect = async (path: string) => {
    setLoading(prev => ({ ...prev, [path.slice(1)]: true })) // Set loading state based on path
    await router.push(path)
    setLoading(prev => ({ ...prev, [path.slice(1)]: false })) // Reset loading state after navigation
  }

  return (
    <div className="flex min-h-full w-screen flex-col sm:supports-[min-height:100dvh]:min-h-[100dvh] md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]">
      <div
        className="relative flex flex-1 flex-col justify-center items-start px-5 pt-8 text-white"
        style={{ backgroundColor: 'rgb(0, 0, 46)' }}
      >
        <div className="left-0 top-8 flex w-full px-6 sm:absolute md:top-[22px] md:px-6 lg:px-8">
          {/* <h1 className="text-lg text-white mr-4">Tax Intelligence</h1> */}
          <button className="text-white mr-4">Features</button>
          <button className="text-white mr-4">Pricing</button>
          <button className="text-white mr-4">About</button>
          <button className="text-white mr-4">Contact</button>
          <button className="text-white mr-4">Settings</button>
        </div>

        <div className="flex flex-col text-[32px] leading-[1.2] md:text-[40px]">
          <div className="-mt-4 flex w-full flex-col pr-5 md:pr-8 lg:pr-10">
            <p className="text-[#D292FF] font-bold">TaxIntelligence</p>
            <p className="text-[#D292FF] text-[24px]">
              An AI-powered chatbot to help you understand the tax law.
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex grow flex-col items-center justify-between bg-black px-5 py-8 text-white sm:rounded-t-[30px] md:rounded-none md:px-6">
        <div className="relative flex w-full grow flex-col items-center justify-center">
          <h2 className="text-center text-[20px] leading-[1.2] md:text-[32px] md:leading-8 font-bold">
            Get Started
          </h2>
          <div className="mt-5 w-full max-w-[440px]">
            <div className="grid gap-x-3 gap-y-2 sm:grid-cols-2 sm:gap-y-0">
              <button
                onClick={() => handleRedirect(`/login`)}
                className="relative flex h-12 items-center justify-center rounded-md text-center text-base font-medium bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF]"
                disabled={loading.login}
              >
                {/* {loading.login ? <LoadingIcon /> : "Log in"} */}
                {loading.login
                  ? (console.log('Loading...'), (<LoadingIcon />))
                  : 'Log in'}
              </button>
              <button
                onClick={() => handleRedirect(`/register`)}
                className="relative flex h-12 items-center justify-center rounded-md text-center text-base font-medium bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF]"
                disabled={loading.login}
              >
                {loading.login ? <LoadingIcon /> : 'Sign up'}
              </button>
            </div>
          </div>
        </div>
        <div className="items-center mt-10 flex flex-col justify-center">
          <div className="flex justify-center text-gray-300 md:mb-3">
            <IconTaxIntelligence />
          </div>
          <div className="items-center flex gap-3 py-0 text-xs text-token-text-tertiary">
            <a href="#" className="cursor-pointer font-normal underline">
              Terms of Use
            </a>
            <span className="text-token-text-tertiary">|</span>
            <a href="#" className="cursor-pointer font-normal underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
