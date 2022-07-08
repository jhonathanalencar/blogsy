import { FaCircleNotch } from 'react-icons/fa'
import styles from './styles.module.scss'

export function Loader(){
  return (
    <FaCircleNotch className={styles.loader} />
  )
}