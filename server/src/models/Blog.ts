import mongoose, { Types } from 'mongoose'
import { IPost, Post } from './Post';

interface IBlog{
  name: string;
  posts: Types.DocumentArray<IPost>
  createdBy:  mongoose.Schema.Types.ObjectId;
}

const BlogSchema = new mongoose.Schema<IBlog>({
  name: {
    type: String,
    required: [true, 'Please provide blog name'],
    maxlength: 50,
    trim: true,
    unique: true
  },
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  }
}, { timestamps: true })

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema)