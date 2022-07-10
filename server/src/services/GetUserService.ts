import { User } from "../models/User";

class GetUserService{
  async execute(userId: string){
    const user = await User.findOne({
      _id: userId
    })

    return user
  }
}

export { GetUserService }