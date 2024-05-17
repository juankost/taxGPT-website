import React from 'react'
import { IconTaxIntelligence } from '@/components/Common/icons'

const AuthenticationHeader = ({ theme }: { theme: string | undefined }) => (
  <header>
    <div className="flex justify-center align-center pt-10">
      <IconTaxIntelligence
        theme={theme}
        size={{ width: '400', height: '90' }}
      />
    </div>
  </header>
)

export { AuthenticationHeader }
