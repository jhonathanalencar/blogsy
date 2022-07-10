import { BadRequestError } from "../errors";
import { Blog } from "../models/Blog";
import { Post } from "../models/Post";

class CreateBlogService {
  async execute(name: string, userId: string){
    const parsedName = name.toLowerCase()
    const hasName = await Blog.findOne({ name: parsedName })
    if(hasName){
      throw new BadRequestError(`A blog already exists with this name. Please choose another name`)
    }

    const hasBlog = await Blog.findOne({ createdBy: userId })
    
    if(hasBlog){
      throw new BadRequestError('User already has a blog')
    }
    
    const blog = await Blog.create({
      name,
      createdBy: userId
    })

    return { blog }
  }
}

export { CreateBlogService }