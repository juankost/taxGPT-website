import styles from './FormError.module.css'
import { cx } from '../Common/classNames'
const FormError = (props: JSX.IntrinsicElements['span']) => {
  const errorStyle = {
    fontSize: '0.675rem',
    lineHeight: '1rem',
    color: '#da4e42',
    border: '1px solid #da4e42',
    padding: '0.5rem',
    letterSpacing: '0',
    borderRadius: '0.5rem'
  }
  return <span {...props} style={{ ...errorStyle, ...props.style }} />
}
export { FormError }
