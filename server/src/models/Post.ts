import mongoose from 'mongoose'

export interface IPost{
  title: string;
  text: string;
  publishedAt: Date;
  isFavorited: boolean;
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAtBlog: mongoose.Schema.Types.ObjectId;
}

const PostSchema = new mongoose.Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Please provide title'],
    maxlength: 100,
    unique: true
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
  isFavorited: {
    type: Boolean,
    default: false
  }
})

export const Post = mongoose.model<IPost>('Post', PostSchema)