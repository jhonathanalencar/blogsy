import { Blog } from "../models/Blog";
import { Favorite } from "../models/Favorite";
import { Post } from "../models/Post";

class GetBlogService{
  async execute(userId: string){
    const blog = await Blog.findOne({ createdBy: userId })
    const posts = await Post.find({ createdAtBlog: blog._id })
      .sort({publishedAt: 'desc'})

    posts.map((post) => blog.posts.push(post))

    return { blog }
  }
}

export { GetBlogService }