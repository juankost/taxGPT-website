import React from 'react'
import { Header } from './Header'

const LeftPane = () => (
  <div
    className="relative flex flex-1 flex-col justify-center items-start px-5 pt-8 text-white"
    style={{ backgroundColor: 'rgb(0, 0, 46)' }}
  >
    {/* <Header /> */}
    <div className="flex flex-col text-[32px] leading-[1.2] md:text-[40px]">
      <div className="-mt-4 flex w-full flex-col pr-5 md:pr-8 lg:pr-10">
        <p className="text-[#D292FF] font-bold">TaxIntelligence</p>
        <p className="text-[#D292FF] text-[24px]">
          An AI-powered chatbot to help you understand the Slovenian tax law.
        </p>
      </div>
    </div>
  </div>
)

export { LeftPane }
