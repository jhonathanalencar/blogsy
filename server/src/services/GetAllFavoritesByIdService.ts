import { Favorite } from "../models/Favorite";

class GetAllFavoritesByIdService{
  async execute(postId: string){
    const favorites = await Favorite.find({ publishedPost: postId })

    return { favorites }
  }
}

export { GetAllFavoritesByIdService }