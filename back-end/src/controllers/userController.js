import { createUser } from "../services/userServices.js"

export const userSignup = async (req,res) => {
    let userDetails = await createUser(req.body)
    let {user,auth_token} = userDetails;
    console.log("created user : ",userDetails);
    let payload = {
        id:user._id,
        name:user.name,
        token:auth_token
    }
    return res.json(payload)
}