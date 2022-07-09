import { useContext } from "react";
import { BlogContext } from "../contexts/blogContext";

export function useBlog(){
  return useContext(BlogContext)
}