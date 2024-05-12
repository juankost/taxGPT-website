import React from 'react'
import { IconTaxIntelligence } from '@/components/Common/icons'

const AuthenticationHeader = () => (
  <header>
    <div className="flex justify-center align-center bg-white pt-10">
      <IconTaxIntelligence
        textColor="black"
        size={{ width: '400', height: '90' }}
      />
    </div>
  </header>
)

export { AuthenticationHeader }
