const express = require("express");
const route = express.Router();
const userCollection = require("../../model/user_model");
const session = require("express-session");
require("../../services/passport-setup");
const passport = require("passport");
const dotenv = require('dotenv').config({path:'config.env'});
const keySecret = process.env.keySecret
const jwt =require("jsonwebtoken")
// route.get('/google',(req,res)=>{
//     res.send("login with google")
// })

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
  
}



route.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

route.use(passport.initialize());
route.use(passport.session())

route.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

route.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
  })
);

route.get("/google/failure", (req, res) => {
  res.send("something went wrong....");
});


route.get("/protected", isLoggedIn, (req, res) => {
  const userId = req.user._id; 
  const token = jwt.sign({ userId }, keySecret);
  res.cookie("sessions", token);
  return res.redirect("/");
});


route.get('/logout', (req,res) =>{
  req.session.destroy();
  res.send('see u again')
})


module.exports = route;
