import styles from './IconButton.module.css'
import { cx } from '../Common/classNames'

const IconButton = (props: JSX.IntrinsicElements['button']) => {
  return (
    <button
      {...props}
      className={cx(styles.button, props.className)}
      type={props.type ?? 'button'}
    />
  )
}
export { IconButton }
