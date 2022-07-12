import mongoose from "mongoose";
import { Favorite } from "../models/Favorite";
import { Post } from "../models/Post";

class AddFavoriteService{
  async execute(userId: string, publishedPost: string){

    const posts = await Post.find({ id: new mongoose.Types.ObjectId(publishedPost)})

    const isFavorited = await Favorite.findOne({ 
      favoritedBy: userId, publishedPost  
    })

    if(isFavorited){
      await Favorite.deleteOne({_id: isFavorited._id})
      return;
    }

    const favorite = await Favorite.create({
      favoritedBy: userId,
      publishedPost: publishedPost
    })

    const createdFavorite = await favorite.save()

    posts.map(async (post) =>{
      if(post.id === publishedPost){
        post.favorites.push(createdFavorite)
        await post.save()
      }
    })

    return { favorite }
  }
}

export { AddFavoriteService }