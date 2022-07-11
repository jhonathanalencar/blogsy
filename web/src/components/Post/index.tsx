import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa'
import { useBlog } from '../../hooks/useBlog';
import { useAuth } from '../../hooks/useAuth';
import { format } from 'date-fns'

interface Favorite{
  _id: string;
  favoritedBy: string;
  isFavorited: boolean;
  publishedPost: string;
}

interface PostProps{
  _id: string;
  title: string;
  text: string;
  publishedAt: Date;
  createdBy: string;
  createdAtBlog: string;
  favorites: Favorite[];
  handleOpenModal: (_id: string, title: string, content: string) => void;
}

export function Post({_id, title, text, publishedAt, handleOpenModal, createdAtBlog, favorites}: PostProps){
  const [readMore, setReadMore] = useState(false)
  const [isPostFavoritedByUser, setIsPostFavoritedByUser] = useState(false)
  const { specificBlog, favoritePost, postFavorites } = useBlog()
  const { user } = useAuth()
  
  const parsedDate = format(new Date(publishedAt), "EEEE, MMM dd, yyyy 'at' p")
  
  function handleFavoritePost(){
    if(user){
      favoritePost(user._id, createdAtBlog ,_id)
    }
  }

  useEffect(() =>{
    setIsPostFavoritedByUser(false)
    favorites.map((favorite) =>{
      if(favorite.favoritedBy === user?._id){
        setIsPostFavoritedByUser(true)
      }
    })
  }, [favorites])

  return(
    <div className={styles.container}>
      <header>
        <span>{parsedDate}</span>
        <div className={styles.buttonsWrapper}>
          {specificBlog?.createdBy === user?._id && (
            <button
              type="button"
              className={styles.editButton}
              onClick={ () => handleOpenModal(_id, title, text)}
            >
              <FaEdit />
            </button>
          )}
          <div className={styles.favoritedAmount}>
            <button
              type="button"
              className={isPostFavoritedByUser ? styles.favorited : ''}
              onClick={handleFavoritePost}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M133.7,211.9l81-81c19.9-20,22.8-52.7,4-73.6a52,52,0,0,0-75.5-2.1L128,70.5,114.9,57.3c-20-19.9-52.7-22.8-73.6-4a52,52,0,0,0-2.1,75.5l83.1,83.1A8.1,8.1,0,0,0,133.7,211.9Z" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
            </button>
            <span>
              {favorites.length > 0 ? favorites.length : ''}
            </span>
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <strong>{title}</strong>
        {text.length > 300 ? (
          <p>
            {readMore ? text : `${text.substring(0, 300)}...`}
            <button 
              type="button" 
              className={styles.readMoreButton}
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? 'show less' : 'read more'}
            </button>
          </p>
        ) : (
          <p>
            {text}
          </p>
        )}
      </div>
    </div>
  )
}