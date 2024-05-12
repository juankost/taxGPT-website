import * as React from 'react'
import styles from './PasswordForm.module.css'
import { cx } from '../Common/classNames'
import { Input } from '../Input'
import { IconButton } from '../IconButton'
import { VisibleIcon } from '../Icons/VisibleIcon'
import { HiddenIcon } from '../Icons/HiddenIcon'
import { Button } from '../Button'
import { FirebaseError } from '@firebase/util'
import { FormError } from '../FormError'

export interface PasswordFormValue {
  email: string
  password: string
}

interface PasswordFormProps
  extends Omit<JSX.IntrinsicElements['form'], 'onSubmit'> {
  loading: boolean
  onSubmit: (value: PasswordFormValue) => void
  error?: FirebaseError
}
export function PasswordForm({
  children,
  loading,
  error,
  onSubmit,
  ...props
}: PasswordFormProps) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isHidden, setIsHidden] = React.useState(true)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    event.stopPropagation()

    onSubmit({
      email,
      password
    })
  }

  const inputBaseClasses =
    'w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500'

  return (
    <div className={cx(styles.container, props.className)}>
      <form onSubmit={handleSubmit} {...props} className={styles.form}>
        <Input
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Email address"
          className={inputBaseClasses}
        />
        <div className={styles.input}>
          <Input
            required
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={isHidden ? 'password' : 'text'}
            placeholder="Password"
            minLength={8}
            className={inputBaseClasses}
          />
          {(isHidden && (
            <IconButton
              onClick={() => setIsHidden(false)}
              className={styles.adornment}
            >
              <VisibleIcon />
            </IconButton>
          )) || (
            <IconButton
              onClick={() => setIsHidden(true)}
              className={styles.adornment}
            >
              <HiddenIcon />
            </IconButton>
          )}
        </div>
        {error && <FormError>{error.message}</FormError>}
        <Button
          loading={loading}
          disabled={loading}
          variant="contained"
          type="submit"
        >
          Continue
        </Button>
      </form>
      {children}
    </div>
  )
}
