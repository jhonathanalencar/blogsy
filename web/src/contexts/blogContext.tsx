import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

interface BlogContextData{
  blog: BlogType | null;
  specificBlog: BlogType | null;
  createBlog: (name: string, userId: string) => void
  getBlogById: (blogId: string) => void
}

interface BlogContextProviderProps{
  children: ReactNode;
}

interface Post{
  title: string;
  text: string;
  publishedAt: Date;
  isFavorited: string;
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
      const token = localStorage.getItem('@blogsy:token')
      console.log(blogId)
      if(token){
        api.defaults.headers.common.authorization = `Bearer ${token}`
        const response = await api.post<BlogTypeResponse>('/blogId', { blogId })
        const { data } = response
        console.log(data)
        setSpecificBlog(data.blog)
      }
    }catch(error: any){
      console.log(error)
    }
    setTimeout(() =>{
      changeIsLoading(false)
    }, 1000)
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
      createBlog,
      getBlogById
    }}>
      {children}
    </BlogContext.Provider>
  )
}