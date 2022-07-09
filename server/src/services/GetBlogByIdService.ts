import { Blog } from "../models/Blog";

class GetBlogByIdService{
  async execute(blogId: string){
    const blog = await Blog.findOne({ _id: blogId })

    return { blog }
  }
}

export { GetBlogByIdService }