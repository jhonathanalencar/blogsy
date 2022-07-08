import mongoose from 'mongoose'

interface IBlog{
  name: string;
  posts: mongoose.Schema.Types.ObjectId[]
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
  posts: [mongoose.Schema.Types.ObjectId],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  }
}, { timestamps: true })

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema)