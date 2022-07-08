import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import AsideImage from '../../assets/discoverable.svg'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export function Signin(){
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { signOut, user } = useAuth()

  useEffect(() =>{
    const token = localStorage.getItem('@blogsy:token')

    if(token){
      setIsAuthenticated(true)
    }else{
      setIsAuthenticated(false)
    }
  }, [])

  return(
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.center}>
          <div className={styles.loginWrapper}>
            <strong>Welcome to <span>blogsy</span></strong>
            {!user ? (
              <>
                <form>
                  <input type="email" placeholder="Email" autoComplete="current-email" />
                  <input type="password" placeholder="Password" autoComplete="current-password" />
                  <button type="submit">Sign in</button>
                </form>
                <span className={styles.signupText}>Don't have an account yet? <Link to="/signup">Sign up</Link></span>
              </>
            ) : (
              <button 
                type="button" 
                className={styles.signOutButton}
                onClick={signOut}
              >
                Sign out</button>
            )}
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