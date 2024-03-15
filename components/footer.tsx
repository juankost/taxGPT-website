import React from 'react'
import { cn } from '@/lib/utils'
export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      <strong>Notice: </strong> This does not constitute legal advice. We do not
      accept any liability for the information provided.
    </p>
  )
}
