import { Post } from "../models/Post";

class CreatePostService{
  async execute(title: string, text: string, userId: string){
    const post = await Post.create({
      title,
      text,
      createdBy: userId
    })

    return { post }
  }
}

export { CreatePostService }