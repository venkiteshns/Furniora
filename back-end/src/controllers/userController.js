import { createUser, getUser } from "../services/userServices.js";
import { createToken } from "../utils/jwtHelper.js";

export const userSignup = async (req, res) => {
  let userDetails = await createUser(req.body);
  let { user, auth_token } = userDetails;

  console.log("created user : ", userDetails);

  let payload =
    typeof userDetails === "object"
      ? {
          id: user._id,
          name: user.name,
          email: user.email
        }
      : userDetails;

  res.cookie("token", auth_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 5 * 60 * 1000,
  });

  return res.json(payload);
};

export const userLogin = async (req, res) => {
  let isUser = await getUser(req.body);
  if (!req?.cookie && typeof isUser === "object") {
    let auth_token = await createToken(isUser.user);
    res.cookie("token", auth_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 5 * 60 * 1000,
    });
  }
  res.json(isUser);
};

export const userLogout = (req, res) => {
  res.clearCookie("token");
  res.json({logout:"success"})
};
