import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import AsideImage from '../../assets/discoverable.svg'
import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Loader } from '../../components/Loader'
import { useBlog } from '../../hooks/useBlog'

export function Signin(){
  const [blogName, setBlogName] = useState('')
  const { createBlog, blog, currentBlogCode } = useBlog()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { signOut, user, isLoading, signIn, error, changeError } = useAuth()
  const token = localStorage.getItem('@blogsy:token')

  
  function handleSubmit(e: FormEvent){
    e.preventDefault()

    if(email.trim() === '' || password.trim() === ''){
      if(changeError){
        changeError('Please fill out all fields')
      }
      return;
    }

    if(signIn && changeError){
      signIn(email, password)
      changeError('')
    }
  }

  function handleCreateBlog(){
    if(blogName.trim() === ''){
      if(changeError){
        changeError('Please insert blog name')
      }
      return;
    }

    if(createBlog && user){
      createBlog(blogName, user.id)
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
    if(changeError){
      changeError('')
    }
  }, [])

  useEffect(() =>{
    if(blog && user){
      if(currentBlogCode){
        navigate(`/blog/${currentBlogCode}`)
      }else{
        navigate(`/blog/${blog._id}`)
      }
    }
  }, [blog])


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
              <div className={styles.createBlogWrapper}>
                <span className={styles.errorText}>{error}</span>
                <div className={styles.createButtonWrapper}>
                  {!blog && (
                    <input 
                      type="text" 
                      placeholder="Blog name"
                      autoComplete="new-blog"
                      value={blogName}
                      onChange={e => setBlogName(e.target.value)}
                    />
                  )}
                  <button 
                    type="button"
                    className={styles.createButton}
                    onClick={handleCreateBlog}
                  >
                    {isLoading ? <Loader /> : 'Create a blog'}
                  </button>
                </div>
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