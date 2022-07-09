import { Post } from '../../components/Post'
import styles from './styles.module.scss'
import { GoSearch, GoSignOut } from 'react-icons/go'
import { BiCopy } from 'react-icons/bi'
import { useAuth } from '../../hooks/useAuth'

export function Blog(){
  const { signOut } = useAuth()

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
            <strong>blogsy</strong>
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