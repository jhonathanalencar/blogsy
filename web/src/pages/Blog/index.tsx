import { Post } from '../../components/Post'
import styles from './styles.module.scss'
import { GoSearch, GoSignIn, GoSignOut, GoX } from 'react-icons/go'
import { BiCopy, BiPlusCircle } from 'react-icons/bi'
import { useAuth } from '../../hooks/useAuth'
import { useBlog } from '../../hooks/useBlog'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../../components/Loader'

export function Blog(){
  const params = useParams()
  const navigate = useNavigate()
  const { signOut, isLoading, user, error, changeError } = useAuth()
  const {
    blog, 
    getBlogById, 
    specificBlog, 
    isModalOpen, 
    openModal, 
    closeModal, 
    isEditing,
    changeIsEditingState,
    createPost, 
    updatePost,
    deletePost,
    postFavorites
  } = useBlog()
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postId, setPostId] = useState('')
  
  useEffect(() =>{
    if(params && params.id && getBlogById){
      getBlogById(params.id)
    }
    
  }, [])
  
  if(!specificBlog || isLoading && !isModalOpen){
    return(
      <Loader />
    )
  }
  
  function handleCreatePost(e: FormEvent){
    e.preventDefault()

    if(postTitle.trim() === '' || postContent.trim() === ''){
      changeError('Please fill out all fields')
      return;
    }

    if(specificBlog){
      createPost(postTitle, postContent, specificBlog._id)
    }
  }

  function handleCloseModal(){
    closeModal()
    setPostTitle('')
    setPostContent('')
    changeIsEditingState(false)
  }

  function handleOpenModal(_id?: string, title: string = '', content: string = ''){
    openModal()
    if(title && content && _id && specificBlog){
      if(specificBlog.posts.length > 0){
        changeIsEditingState(true)
        setPostId(_id)
      }
    }
    setPostTitle(title)
    setPostContent(content)
  }

  function handleUpdatePost(){
    if(specificBlog){
      updatePost(specificBlog._id,postId, postTitle, postContent)
    }
  }

  function handleDeletePost(){
    if(specificBlog){
      deletePost(specificBlog._id, postId)
    }
  }
  
  return(
    <div 
      className={styles.container} style={isModalOpen ? {height: '100vh', overflow: 'hidden'} : {} }
    >
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
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalCenter}>
            <button
              type="button"
              className={styles.closeModalButton}
              onClick={handleCloseModal}
            >
              <GoX />
            </button>
            <form onSubmit={handleCreatePost}>
              <strong>{isEditing ? 'Edit Post' : 'Add new post'}</strong>
              <span className={styles.errorText}>{error}</span>
              <input 
                type="text" 
                placeholder="Title" 
                value={postTitle}
                onChange={e => setPostTitle(e.target.value)}
              />
              <textarea 
                placeholder="Content" 
                value={postContent}
                onChange={e => setPostContent(e.target.value)}
              />
              {isEditing ? (
                <div>
                  <div className={styles.editButtonsWrapper}>
                    <button 
                      type="button" 
                      className={styles.deleteButton}
                      onClick={handleDeletePost}
                    >
                      {isLoading ? <Loader /> : 'Delete'}
                    </button>
                    <button 
                      type="button" 
                      className={styles.editButton}
                      onClick={handleUpdatePost}
                    >
                      {isLoading ? <Loader /> : 'Edit'}
                    </button>
                  </div>
                </div>
              ) : (
                <button type="submit">
                  {isLoading ? <Loader /> : 'publish'}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
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
          {specificBlog.createdBy === user?._id && (
            <div className={styles.createPostButtonWrapper}>
              <button
                type="button"
                className={styles.createPostButton}
                onClick={ () => handleOpenModal()}
              >
                <span>New post</span>
                <BiPlusCircle />
              </button>
            </div>
          )}
        </div>
      </nav>
      <main className={styles.main}>
        <div className={styles.mainCenter}>
          {specificBlog.posts.length > 0 ? (
            <div className={styles.postsWrapper}>
              {specificBlog.posts.map((post) =>{
                return(
                  <Post {...post} key={post._id} handleOpenModal={handleOpenModal} />
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