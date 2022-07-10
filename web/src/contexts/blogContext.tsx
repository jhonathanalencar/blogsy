import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

interface BlogContextData{
  blog: BlogType | null;
  specificBlog: BlogType | null;
  currentBlogCode: string;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  createBlog: (name: string, userId: string) => void
  getBlogById: (blogId: string) => void
  createPost: (title: string, text: string, blogId: string) => void
}

interface BlogContextProviderProps{
  children: ReactNode;
}

interface Post{
  _id: string;
  title: string;
  text: string;
  publishedAt: Date;
  isFavorited: boolean;
  createdBy: string;
  createdAtBlog: string;
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
  const { changeError, changeIsLoading} = useAuth()
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

  async function getBlogById(blogId: string){
    changeIsLoading(true)
    try{
      const response = await api.post<BlogTypeResponse>('/blogId', { blogId })
      const { data } = response
      
      setSpecificBlog(data.blog)
      setCurrentBlogCode(data.blog._id)
    }catch(error: any){
      console.log(error)
    }
    setTimeout(() =>{
      changeIsLoading(false)
    }, 1000)
  }

  async function createPost(title: string, text: string, blogId: string){
    changeIsLoading(true)
    try{
      await api.post('/createPost', { title, text })

      await getBlogById(blogId)
      closeModal()
      changeError('')
    }catch(error: any){
      const { data } = error.response
      changeError(data.msg)
    }
    changeIsLoading(false)
  }

  function openModal(){
    setIsModalOpen(true)
    changeError('')
  }

  function closeModal(){
    setIsModalOpen(false)
    changeError('')
  }

  const token = localStorage.getItem('@blogsy:token')

  useEffect(() =>{
    if(token){
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<BlogTypeResponse>('/blog').then(response => {
        setBlog(response.data.blog)
      })
    }
  }, [token])

  return(
    <BlogContext.Provider value={{
      blog,
      specificBlog,
      currentBlogCode,
      isModalOpen,
      openModal,
      closeModal,
      createBlog,
      getBlogById,
      createPost
    }}>
      {children}
    </BlogContext.Provider>
  )
}