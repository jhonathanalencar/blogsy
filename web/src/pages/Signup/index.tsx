import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import styles from './styles.module.scss'
import { Loader } from '../../components/Loader'

export function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { signUp, error, changeError, user, isLoading } = useAuth()

  function handleSubmit(e: FormEvent){
    e.preventDefault()
    if(name.trim() === '' || email.trim() === '' || password.trim() === ''){
      changeError('Please fill out all fields')
      return;
    }

    if(signUp && changeError){
      signUp(name, email, password)    
      changeError('')
    }  
  }

  useEffect(() =>{
    const token = localStorage.getItem('@blogsy:token')

    if(token){
      navigate('/')
    }
  }, [user])

  useEffect(() =>{
    if(changeError){
      changeError('')
    }
  }, [])

  return(
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.mainCenter}>
          <div className={styles.formWrapper}>
            <strong>Create an account</strong>
            <span>Already have an account? <Link to="/">Sign in</Link></span>
            <span className={styles.errorText}>{error}</span>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">
                Name
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your name"
                  autoComplete="username"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </label>
              <label htmlFor="email">
                Email
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your email" 
                  autoComplete="current-email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </label>
              <label htmlFor="password">
                Password
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Your password" 
                  autoComplete="new-password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </label>
              <button type="submit">
                {isLoading ? <Loader /> : 'Sign up'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}