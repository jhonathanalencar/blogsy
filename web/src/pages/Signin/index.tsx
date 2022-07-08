import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import AsideImage from '../../assets/discoverable.svg'
import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Loader } from '../../components/Loader'

export function Signin(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { signOut, user, isLoading, signIn, error, changeError } = useAuth()
  const token = localStorage.getItem('@blogsy:token')

  
  function handleSubmit(e: FormEvent){
    e.preventDefault()

    if(signIn){
      signIn(email, password)
    }
  }

  useEffect(() =>{
    if(token){
      setIsAuthenticated(true)
      setEmail('')
      setPassword('')
    }else{
      setIsAuthenticated(false)
    }
  }, [token])

  useEffect(() =>{
    changeError('')
  }, [])

  return(
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.center}>
          <div className={styles.loginWrapper}>
            <strong>Welcome to <span>blogsy</span></strong>
            {!isAuthenticated ? (
              <>
                <span className={styles.errorText}>{error}</span>
                <form onSubmit={handleSubmit}>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    autoComplete="current-email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                  />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    autoComplete="current-password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button type="submit">
                    {isLoading ? <Loader /> : 'Sign in'}
                  </button>
                </form>
                <span className={styles.signupText}>Don't have an account yet? <Link to="/signup">Sign up</Link></span>
              </>
            ) : (
              <div className={styles.createButtonWrapper}>
                <button>Create a blog</button>
                <button 
                  type="button" 
                  className={styles.signOutButton}
                  onClick={signOut}
                >
                  Sign out</button>
              </div>
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