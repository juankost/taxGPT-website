import React from 'react'
import { IconTaxIntelligence } from '@/components/Common/icons'

const Footer = () => (
  <div className="items-center mt-10 flex flex-col justify-center">
    <div className="flex justify-center text-gray-300 md:mb-3">
      <IconTaxIntelligence inverted />
    </div>
    <div className="items-center flex gap-3 py-0 text-xs text-token-text-tertiary">
      <a
        href="/terms-of-service"
        className="cursor-pointer font-normal underline"
      >
        Terms of Use
      </a>
      <span className="text-token-text-tertiary">|</span>
      <a
        href="/privacy-policy"
        className="cursor-pointer font-normal underline"
      >
        Privacy Policy
      </a>
    </div>
  </div>
)

export { Footer }
