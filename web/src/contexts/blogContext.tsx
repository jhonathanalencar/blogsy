import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

interface BlogContextData{
  blog: BlogType | null;
  createBlog: (name: string, userId: string) => void
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
  const { changeError} = useAuth()
  const navigate = useNavigate()

  async function createBlog(name: string, userId: string){
    try{
      const response = await api.post('/createBlog', { name, userId})
      const { data } = response
      setBlog(data)
      changeError('')
    }catch(error: any){
      const { data } = error.response
      changeError(data.msg)
    }
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
      createBlog
    }}>
      {children}
    </BlogContext.Provider>
  )
}