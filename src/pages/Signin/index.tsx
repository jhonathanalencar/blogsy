import styles from './styles.module.scss'
import AsideImage from '../../assets/discoverable.svg'

export function Signin(){
  return(
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.center}>
          <div className={styles.loginWrapper}>
            <strong>Welcome to <span>blogsy</span></strong>
            <form>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign in</button>
            </form>
            <span className={styles.signupText}>Don't have an account yet? <a href="#">Sign up</a></span>
          </div>
          <div className={styles.divisor}>
            <div></div>
            <span>or</span>
            <div></div>
          </div>
          <div className={styles.codeInputWrapper}>
            <strong>access a blog</strong>
            <div className={styles.codeInput}>
              <input type="text" placeholder='Code' />
              <button type="button">Access</button>
            </div>
          </div>
        </div>
      </main>
      <aside className={styles.aside}>
        <div className={styles.asideWrapper}>
          <strong>Welcome back</strong>
          <span>Sign in to explore new horizons!</span>
          <img src={AsideImage} alt="girl looking at something image" />
        </div>
      </aside>
    </div>
  )
}