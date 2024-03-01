import express from "express";
const router = express.Router();

import 
{   loginUser,
    signupUser
} from "../controller/auth.js";

router.get("/",(req,res) => {
    const message = req.query.message;
    res.render("home.ejs",{message});
})

router.post("/login",loginUser)

router.get("/signup",(req,res)=> {
    res.render("signup.ejs")
})

router.post("/signup",signupUser);

router.get("/result",(req,res) => {
    res.render("result.ejs");
})

export default router;