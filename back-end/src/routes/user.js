import express from "express";
import { userSignup } from "../controllers/userController.js";

const router = express.Router()

router.get('/',(req,res)=>{
    res.send("helooo")
} )

router.post('/user/login',(req,res) => {
    console.log("login data",req.body);
    res.json({data:"received"})
})

router.post('/user/signup',userSignup)

export default router;