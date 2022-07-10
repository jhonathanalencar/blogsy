import { NotFoundError } from "../errors/notFound";
import { Post } from "../models/Post";

class DeletePostService{
  async execute(postId: string, userId: string){
    const post = await Post.findByIdAndRemove({ _id: postId, createdBy: userId })

    if(!post){
      throw new NotFoundError(`No post with id ${postId}`)
    }

    return { post }
  }
}

export { DeletePostService }