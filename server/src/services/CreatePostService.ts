import { BadRequestError } from "../errors";
import { Blog } from "../models/Blog";
import { Post } from "../models/Post";

class CreatePostService{
  async execute(title: string, text: string, userId: string){
    const blog = await Blog.findOne({ createdBy: userId })
    const { _id: blogId } = blog

    const hasTitle = await Post.findOne({ title: new RegExp(`^${title}$`, 'i')})
    if(hasTitle){
      throw new BadRequestError(`A post with this title already exists.`)
    }

    const post = await Post.create({
      title,
      text,
      createdBy: userId,
      createdAtBlog: blogId.toString()
    })

    return { post }
  }
}

export { CreatePostService }