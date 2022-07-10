import { NotFoundError } from "../errors/notFound";
import { Post } from "../models/Post";

class UpdatePostService{
  async execute(userId: string, postId: string, title: string, text: string){
    const post = await Post.findByIdAndUpdate({ _id: postId, createdBy: userId }, {
      title,
      text,
    }, { new: true, runValidators: true })

    if(!post){
      throw new NotFoundError(`No post with id ${postId}`)
    }

    return { post }
  }
}

export { UpdatePostService }