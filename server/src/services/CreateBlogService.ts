import { BadRequestError } from "../errors";
import { Blog } from "../models/Blog";

class CreateBlogService {
  async execute(name: string, userId: string){
    if(Blog.find({name: name})){
      throw new BadRequestError(`A blog already exists with this name. Please choose another name`)
    }
    
    const blog = await Blog.create({
      name,
      createdBy: userId
    })

    return { blog }
  }
}

export { CreateBlogService }