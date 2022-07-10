import { BadRequestError } from "../errors";
import { Blog } from "../models/Blog";

class CreateBlogService {
  async execute(name: string, userId: string){
    const hasName = await Blog.findOne({ name: new RegExp(`^${name}$`, 'i') })
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