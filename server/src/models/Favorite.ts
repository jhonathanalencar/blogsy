import mongoose, { Types } from "mongoose";

export interface IFavorite{
  isFavorited: boolean;
  favoritedBy: mongoose.Schema.Types.ObjectId;
  publishedPost: mongoose.Schema.Types.ObjectId;
}

const FavoriteSchema = new mongoose.Schema<IFavorite>({
  isFavorited: {
    type: Boolean,
    default: false
  },
  favoritedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  publishedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
})

export const Favorite = mongoose.model<IFavorite>('Favorite', FavoriteSchema)