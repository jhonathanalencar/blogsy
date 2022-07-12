import { Blog } from "../models/Blog";
import { Post } from "../models/Post";

class GetBlogByIdService{
  async execute(blogId: string, search?: string){
    const blog = await Blog.findOne({ _id: blogId })

    if(search){
      const posts = await Post.find({ $or: [{
                                        text: {$regex: search, $options: 'i'}
                                      },
                                      {
                                        title: {$regex: search, $options: 'i'}
                                      }],
                                      $and: [{
                                        createdAtBlog: blogId
                                      }]})
        .sort({ publisheAt: 'desc' }).populate('favorites')

      posts.map((post) => {
        blog.posts.push(post)
      })

      return { blog }

    }else{
      const posts = await Post.find({ createdAtBlog: blogId })
        .sort({publishedAt: 'desc'}).populate('favorites')

      posts.map((post) => {
        blog.posts.push(post)
      })
      return { blog }

    }
  }
}

export { GetBlogByIdService }