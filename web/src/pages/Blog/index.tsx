import { Post } from '../../components/Post'
import styles from './styles.module.scss'
import { GoSearch, GoSignOut } from 'react-icons/go'
import { BiCopy } from 'react-icons/bi'
import { useAuth } from '../../hooks/useAuth'
import { useBlog } from '../../hooks/useBlog'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../../components/Loader'

export function Blog(){
  const { signOut, isLoading } = useAuth()
  const { blog, getBlogById, specificBlog } = useBlog()
  const params = useParams()
  
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
        onClick={signOut}
      >
        <GoSignOut />
      </button>
      <nav>
        <div className={styles.navCenter}>
          <header>
            <strong>{specificBlog.name}</strong>
            <div className={styles.code}>
              <span>code</span>
              <button>
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
          <div className={styles.postsWrapper}>
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </main>
    </div>
  )
}