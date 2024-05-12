import * as React from 'react'
import { cx } from '../Common/classNames'

export function Input({ ...props }: JSX.IntrinsicElements['input']) {
  // Adjusted base classes for input to match the button styles more closely
  const inputBaseClasses =
    'w-full px-7 py-3 border-2 border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent'

  // Conditionally apply styles for disabled input
  const disabledClasses = props.disabled ? 'bg-gray-200' : ''

  // Combine classes with any custom classes provided through props
  const inputClasses = cx(inputBaseClasses, disabledClasses, props.className)

  return <input {...props} className={inputClasses} />
}
