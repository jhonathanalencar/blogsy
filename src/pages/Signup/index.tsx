import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export function Signup(){
  return(
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.mainCenter}>
          <div className={styles.formWrapper}>
            <strong>Create an account</strong>
            <span>Already have an account? <Link to="/signin">Sign in</Link></span>
            <form>
              <label htmlFor="name">
                Name
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <label htmlFor="email">
                Email
                <input type="email" name="email" placeholder="Your email" />
              </label>
              <label htmlFor="password">
                Password
                <input type="password" name="password" placeholder="Your password" />
              </label>
              <button type="submit">Sign up</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}