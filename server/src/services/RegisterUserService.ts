import { User } from "../models/User";

interface IUser{
  name: string;
  email: string;
  password: string;
}

class RegisterUserService{
  async execute(name: string, email: string, password: string){
    
    const user = await User.create<IUser>({
      name,
      email,
      password
    })

    const token = user.createJWT()

    return { token, user }
  }
}

export { RegisterUserService }

