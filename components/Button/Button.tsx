import * as React from 'react'
import { LoadingIcon } from '../icons'
import { cx } from '../classNames'

export function Button({
  loading,
  children,
  variant = 'outlined',
  ...props
}: JSX.IntrinsicElements['button'] & {
  loading?: boolean
  variant?: 'contained' | 'outlined'
}) {
  // Define base classes for all buttons
  const baseClasses =
    'inline-block px-7 py-4 font-medium text-sm leading-snug uppercase rounded shadow-md transition duration-150 ease-in-out w-full'

  // Adjusting outlined variant colors for better visibility
  const variantClassNames = {
    contained:
      'bg-gray-700 text-white hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-800 hover:shadow-lg focus:shadow-lg active:shadow-lg focus:outline-none focus:ring-0',
    outlined:
      'bg-transparent border border-gray-700 hover:border-gray-600 text-gray-700 hover:text-gray-800 focus:text-gray-800 active:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 focus:outline-none'
  }

  // Conditional class for loading state
  const loadingClasses = loading ? 'opacity-50 cursor-not-allowed' : ''

  // Combine classes
  const buttonClasses = cx(
    baseClasses,
    variantClassNames[variant],
    loadingClasses,
    props.className
  )

  return (
    <button {...props} className={buttonClasses} disabled={loading}>
      {loading && <LoadingIcon />} {/* Add styles to LoadingIcon as needed */}
      <span>{children}</span>
    </button>
  )
}
