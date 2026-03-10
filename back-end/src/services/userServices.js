import User from "../models/userModel.js";
import { hashPassword } from "../utils/encrypt.js";
import { createToken } from "../utils/jwtHelper.js";

export const createUser = async (data) => {
  try {
    const { name, email, password } = data;
    let user = await User.findOne({ email });

    if (!user) {
      let hashedPassword = await hashPassword(password);

      let userDetails = {
        name,
        email,
        password: hashedPassword,
      };

      let createdUser = await User.create(userDetails);

      let token = createToken(createdUser);

      return {
        user : createdUser,
        auth_token : token
      }

    }else{
        return "User already exist";
    }
  } catch (error) {
    console.log("Error while sign up : ", error.message);
  }
};
