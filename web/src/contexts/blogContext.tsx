import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

interface BlogContextData{
  blog: BlogType | null;
  specificBlog: BlogType | null;
  currentBlogCode: string;
  isModalOpen: boolean;
  isEditing: boolean;
  openModal: () => void;
  closeModal: () => void;
  resetCurrentBlogCode: () => void;
  changeIsEditingState: (state: boolean) => void;
  createBlog: (name: string, userId: string) => void;
  getBlogById: (blogId: string, search?: string) => void;
  accessPersonalBlog: () => void;
  accessBlogByCode: (blogId: string) => Promise<boolean>;
  createPost: (blogId: string, title: string, text: string) => void;
  updatePost: (blogId: string, postId: string, title: string, text: string) => void;
  deletePost: (blogId: string, postId: string) => void;
  favoritePost: (userId: string, blogId: string, postId: string) => void;
  updatePostFavorites: (postId: string) => void;
}

interface BlogContextProviderProps{
  children: ReactNode;
}

interface Favorite{
  _id: string;
  favoritedBy: string;
  isFavorited: boolean;
  publishedPost: string;
}

interface Post{
  _id: string;
  title: string;
  text: string;
  publishedAt: Date;
  createdBy: string;
  createdAtBlog: string;
  favorites: Favorite[];
}

interface BlogType{
  _id: string;
  name: string;
  createdAt: Date;
  createdBy: string;
  posts: Post[]
}

interface BlogTypeResponse{
  blog: BlogType
}

export const BlogContext = createContext({} as BlogContextData)

export function BlogContextProvider({children}: BlogContextProviderProps){
  const [blog, setBlog] = useState<BlogType | null>(null)
  const [specificBlog, setSpecificBlog] = useState<BlogType | null>(null)
  const [currentBlogCode, setCurrentBlogCode] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { changeError, changeIsLoading, user} = useAuth()
  const navigate = useNavigate()

  async function createBlog(name: string, userId: string){
    changeIsLoading(true)
    try{
      const response = await api.post('/createBlog', { name, userId})
      const { data } = response
      setBlog(data)
      changeError('')
      navigate(`/blog/${data.blog._id}`)
    }catch(error: any){
      const { data } = error.response
      changeError(data.msg)
    }
    changeIsLoading(false)
  }

  async function getBlogById(blogId: string, search?: string){
    changeIsLoading(true)
    try{
      if(search){
        const response = await api.post<BlogTypeResponse>(`/blogId?search=${search}`, { blogId })
        const { data } = response
      
        setSpecificBlog(data.blog)
        setCurrentBlogCode(data.blog._id)
      }else{
        const response = await api.post<BlogTypeResponse>('/blogId', { blogId })
        const { data } = response
        
        setSpecificBlog(data.blog)
        // setCurrentBlogCode(data.blog._id)
      }
    }catch(error: any){
      console.log(error)
      navigate('/')
    }
    setTimeout(() =>{
      changeIsLoading(false)
    }, 1000)
  }

  async function accessBlogByCode(blogId: string){
    let error = false
    try{
      const response = await api.post<BlogTypeResponse>('/blogId', { blogId })
      const { data } = response
      
      setSpecificBlog(data.blog)
      // setCurrentBlogCode(data.blog._id)
      navigate(`/blog/${blogId}`)
    }catch(error: any){
      console.log(error)
      error = true
    }
    return error
  }

  async function createPost(title: string, text: string, blogId: string){
    changeIsLoading(true)
    try{
      await api.post('/post', { title, text })

      await getBlogById(blogId)
      closeModal()
      changeError('')
    }catch(error: any){
      const { data } = error.response
      changeError(data.msg)
    }
    changeIsLoading(false)
  }

  async function updatePost(blogId: string, postId: string, title: string, text: string){
    changeIsLoading(true)
    try{
      await api.patch('/post', { postId, title, text })
      await getBlogById(blogId)
      closeModal()
      changeError('')
      setIsEditing(false)
    }catch(error: any){
      const { data } = error.response
      changeError(data.msg)
    }
    changeIsLoading(false)
  }

  async function deletePost(blogId: string, postId: string){
    changeIsLoading(true)
    try{
      await api.delete('/post', {data: { postId }})

      await getBlogById(blogId)
      closeModal()
      changeError('')
      setIsEditing(false)
    }catch(error: any){
      const { data } = error.response
      changeError(data.msg)
    }
    changeIsLoading(false)
  }

  async function favoritePost(userId: string, blogId: string, publishedPost: string){
    try{
      await api.post('/favorite', { userId, publishedPost })

      await updatePostFavorites(blogId)
    }catch(error){
      console.log(error)
    }
  }

  async function updatePostFavorites(blogId: string){
    try{
      const response = await api.post<BlogTypeResponse>('/blogId', { blogId })
      const { data } = response
      
      setSpecificBlog(data.blog)
      // setCurrentBlogCode(data.blog._id)
    }catch(error: any){
      console.log(error)
    }
  }

  function openModal(){
    setIsModalOpen(true)
    changeError('')
  }

  function closeModal(){
    setIsModalOpen(false)
    changeError('')
  }

  function resetCurrentBlogCode(){
    setCurrentBlogCode('')
  }

  function changeIsEditingState(state: boolean){
    setIsEditing(state)
  }

  const token = localStorage.getItem('@blogsy:token')

  function accessPersonalBlog(){
    if(token){
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<BlogTypeResponse>('/blog').then(response => {
        setBlog(response.data.blog)
      })
    }else{
      setBlog(null)
    }
  }

  useEffect(() =>{
    if(token){
      accessPersonalBlog()
    }
  }, [user])

  return(
    <BlogContext.Provider value={{
      blog,
      specificBlog,
      currentBlogCode,
      isModalOpen,
      isEditing,
      openModal,
      closeModal,
      resetCurrentBlogCode,
      changeIsEditingState,
      createBlog,
      getBlogById,
      accessPersonalBlog,
      accessBlogByCode,
      createPost,
      updatePost,
      deletePost,
      favoritePost,
      updatePostFavorites
    }}>
      {children}
    </BlogContext.Provider>
  )
}