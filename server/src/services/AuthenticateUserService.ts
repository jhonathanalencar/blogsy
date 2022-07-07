import { User } from "../models/User"

class AuthenticateUserService{
  async execute(email: string, password: string){

    const user = await User.findOne({ email })

    if(!user){
      throw new Error('User is not registered')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
      throw new Error('Invalid credentials')
    }

    const token = user.createJWT()

    return { token, user }
  }
}

export { AuthenticateUserService }