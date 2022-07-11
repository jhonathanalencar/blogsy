import { Favorite } from "../models/Favorite";

class AddFavoriteService{
  async execute(userId: string, postId: string){

    // const isFavorited = await Favorite.findOne({ favoritedBy: userId, publishedPost: postId })

    // if(isFavorited){
    //   await Favorite.findByIdAndRemove({ _id: isFavorited._id })
    //   return
    // }

    const favorite = await Favorite.create({
      favoritedBy: userId,
      publishedPost: postId
    })

    return { favorite }
  }
}

export { AddFavoriteService }