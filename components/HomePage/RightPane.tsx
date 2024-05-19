import React from 'react'
import { IconLoading } from '@/components/Common/icons'
import { Footer } from '@/components/HomePage/Footer'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const RightPane = () => {
  const router = useRouter()
  const [loading, setLoading] = useState({ login: false, register: false })

  const handleRedirect = async (path: string) => {
    setLoading(prev => ({ ...prev, [path.slice(1)]: true }))
    await router.push(path)
    setLoading(prev => ({ ...prev, [path.slice(1)]: false }))
  }

  return (
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
              {loading.login ? <IconLoading /> : 'Log in'}
            </button>
            <button
              onClick={() => handleRedirect(`/register`)}
              className="relative flex h-12 items-center justify-center rounded-md text-center text-base font-medium bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF]"
              disabled={loading.register}
            >
              {loading.register ? <IconLoading /> : 'Sign up'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export { RightPane }
