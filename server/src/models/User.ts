import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export interface IUser{
  name: string;
  email: string;
  password: string;
  createJWT: () => string;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'
    ],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide email']
  }
})

UserSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function(){
  return sign(
    {
      userId: this._id,
      name: this.name,
      email: this.email,
      password: this.password
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME
    })
}

UserSchema.methods.comparePassword = async function(canditatePassword: string){
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

export const User = mongoose.model<IUser>('User', UserSchema)