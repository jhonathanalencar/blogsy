import { Blog } from "../models/Blog";

class GetBlogService{
  async execute(userId: string){
    const blog = await Blog.findOne({ createdBy: userId })

    return { blog }
  }
}

export { GetBlogService }