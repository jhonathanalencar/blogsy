import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface AuthContextData{
  user: UserType | null;
  error: string;
  isLoading: boolean;
  signUp: (name: string, email: string, password: string) => void
  signOut: () => void
  changeError: (message: string) => void
}

interface AuthContextProviderProps{
  children: ReactNode;
}

interface UserType{
  id: string;
  name: string;
  email: string;
  password: string;
}

interface SignupResponse{
  token: string;
  user: UserType;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({children}: AuthContextProviderProps){
  const [user, setUser] = useState<UserType | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function signUp(name: string, email: string, password: string){
    setIsLoading(true)
    try{
      const response = await api.post<SignupResponse>('/register', { name, email, password })
      const { user } = response.data

      // localStorage.setItem('@blogsy:token', token)

      // api.defaults.headers.common.authorization = `Bearer ${token}`

      setUser(user)
      changeError('')
    }catch(error: any){
      const { data } = error.response
      setError(data.msg)
    }
    setIsLoading(false)
  }

  function signOut(){
    setUser(null)
    localStorage.removeItem('@blogsy:token')
  }

  function changeError(message: string){
    setError(message)
  }

  return(
    <AuthContext.Provider value={{
      user,
      error,
      isLoading,
      signUp,
      signOut,
      changeError
    }}>
      { children }
    </AuthContext.Provider>
  )
}