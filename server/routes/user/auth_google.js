const express = require("express");
const route = express.Router();
const userCollection = require("../../model/user_model");
const session = require("express-session");
require("../../services/passport-setup");
const passport = require("passport");

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

route.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

route.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/google/protected",
    failureRedirect: "/google/failure",
  })
);

route.get("/google/failure", (req, res) => {
  res.send("something went wrong");
});

route.get("/google/protected", isLoggedIn, (req, res) => {
  res.send("hello world");
});

module.exports = route;
