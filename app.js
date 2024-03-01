import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";

import router from "./router/router.js"

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/user",router);

app.listen(port,() => {
    console.log(`server is listening at https://localhost:${port}`);
})