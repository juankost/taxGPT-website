import React from 'react'

const AuthenticationFooter = () => (
  <footer className="text-center text-sm flex items-center justify-center text-gray-500 py-3 px-0">
    <div className="items-center flex gap-3 py-0 text-xs text-token-text-tertiary">
      <a href="#" className="cursor-pointer font-normal underline">
        Terms of Use
      </a>
      <span className="text-token-text-tertiary">|</span>
      <a href="#" className="cursor-pointer font-normal underline">
        Privacy Policy
      </a>
    </div>
  </footer>
)

export { AuthenticationFooter }
