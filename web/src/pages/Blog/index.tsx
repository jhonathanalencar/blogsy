import { Post } from '../../components/Post'
import styles from './styles.module.scss'
import { GoSearch, GoSignIn, GoSignOut } from 'react-icons/go'
import { BiCopy } from 'react-icons/bi'
import { useAuth } from '../../hooks/useAuth'
import { useBlog } from '../../hooks/useBlog'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../../components/Loader'

export function Blog(){
  const { signOut, isLoading, user } = useAuth()
  const { blog, getBlogById, specificBlog } = useBlog()
  const params = useParams()
  const navigate = useNavigate()
  
  useEffect(() =>{
    if(params && params.id && getBlogById){
      getBlogById(params.id)
    }
  }, [])
  
  if(!specificBlog || isLoading){
    return(
      <Loader />
    )
  } 
  

  return(
    <div className={styles.container}>
      <button
        type="button" 
        className={styles.signoutButton}
        onClick={user ? signOut : () => navigate('/signin')}
      >
        {user ? <GoSignOut /> : <GoSignIn /> }
        <span>
         {user ? 'sign out' : 'sign in'}
        </span>
      </button>
      <nav>
        <div className={styles.navCenter}>
          <header>
            <strong>{specificBlog.name}</strong>
            <div className={styles.code}>
              <span>code</span>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(`${specificBlog._id}`)}
              >
                <BiCopy />
              </button>
            </div>
          </header>
          <form className={styles.searchForm}>
            <button type="submit">
              <GoSearch />
            </button>
            <input type="text" placeholder='search in blog' />
          </form>
        </div>
      </nav>
      <main className={styles.main}>
        <div className={styles.mainCenter}>
          {specificBlog.posts.length > 0 ? (
            <div className={styles.postsWrapper}>
              {specificBlog.posts.map((post) =>{
                return(
                  <Post />
                )
              })}
            </div>
          ) : (
            <strong className={styles.emptyListText}>No posts yet</strong>
          )}
        </div>
      </main>
    </div>
  )
}