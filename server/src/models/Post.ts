import mongoose, { Types } from 'mongoose'
import { IFavorite } from './Favorite';

export interface IPost{
  title: string;
  text: string;
  publishedAt: Date;
  favorites: Types.DocumentArray<IFavorite>;
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAtBlog: mongoose.Schema.Types.ObjectId;
}

const PostSchema = new mongoose.Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Please provide title'],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, 'Please provide text'],
  },
  publishedAt: {
    type: Date,
    required: [true, 'Please provide publish date'],
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  },
  createdAtBlog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Favorite'}]
})

export const Post = mongoose.model<IPost>('Post', PostSchema)