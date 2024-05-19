import * as React from 'react'
import { IconLoading } from '@/components/Common/icons'
import { cx } from '../Common/classNames'

const Button = ({
  loading,
  children,
  variant = 'outlined',
  center_text = false,
  ...props
}: JSX.IntrinsicElements['button'] & {
  loading?: boolean
  variant?: 'contained' | 'outlined'
  center_text?: boolean
}) => {
  // Define base classes for all buttons
  const baseClasses =
    'flex items-center space-x-5 rounded-lg inline-block px-7 py-4 text-m leading-snug border rounded shadow-md transition duration-150 ease-in-out w-full'

  // Adjusting outlined variant colors for better visibility
  const variantClassNames = {
    contained:
      'justify-center text-white hover:bg-purple-300 focus:bg-purple-400 active:bg-purple-600 hover:shadow-lg focus:shadow-lg active:shadow-lg focus:outline-none focus:ring-0 border border-gray-500',
    outlined:
      'bg-transparent border-2 border-gray-300 bg-gray-200 hover:border-gray-400 text-gray-700 dark:text-gray-300 dark:bg-gray-800 hover:text-gray-200 focus:text-gray-200 active:text-gray-100 hover:bg-gray-600 focus:bg-gray-800 active:bg-gray-700 focus:outline-none'
  }

  // Give an option to still center the text in the outlined variant of the button
  const centerTextClass = center_text ? 'justify-center' : ''

  // Conditional class for loading state
  const loadingClasses = loading ? 'opacity-50 cursor-not-allowed' : ''
  const style =
    variant === 'contained' ? { backgroundColor: 'rgb(93,31,234)' } : {}

  // Combine classes
  const buttonClasses = cx(
    baseClasses,
    variantClassNames[variant],
    loadingClasses,
    centerTextClass,
    props.className
  )

  return (
    <button
      {...props}
      className={buttonClasses}
      style={style}
      disabled={loading}
    >
      {loading && <IconLoading />}
      {children}
    </button>
  )
}

export { Button }
