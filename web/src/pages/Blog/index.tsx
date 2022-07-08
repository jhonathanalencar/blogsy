import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export function Blog(){
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() =>{
    if(!user){
      navigate('/signin')
    }
  }, [])

  return(
    <h1>Blog</h1>
  )
}