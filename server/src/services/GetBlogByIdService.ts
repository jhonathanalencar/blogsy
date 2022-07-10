import { Blog } from "../models/Blog";
import { Post } from "../models/Post";

class GetBlogByIdService{
  async execute(blogId: string){
    const blog = await Blog.findOne({ _id: blogId })
    const posts = await Post.find({ createdAtBlog: blogId })
      .sort({publishedAt: 'desc'})

    posts.map((post) => blog.posts.push(post))

    return { blog }
  }
}

export { GetBlogByIdService }