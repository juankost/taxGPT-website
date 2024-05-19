'use client'
import type { NextPage } from 'next'
import { LeftPane } from '@/components/HomePage/LeftPane'
import { RightPane } from '@/components/HomePage/RightPane'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-full w-screen flex-col sm:supports-[min-height:100dvh]:min-h-[100dvh] md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]">
      <LeftPane />
      <RightPane />
    </div>
  )
}

export default Home
