import { createUser } from "../services/userServices.js";

export const userSignup = async (req, res) => {
  let userDetails = await createUser(req.body);
  let { user, auth_token } = userDetails;

  console.log("created user : ", userDetails);

  let payload =
    typeof userDetails === "object"
      ? {
          id: user._id,
          name: user.name,
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
