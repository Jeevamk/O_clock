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
route.use(passport.session())

route.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

route.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
  })
);

route.get("/auth/google/failure", (req, res) => {
  res.send("something went wrong");
});

route.get("/auth/protected", isLoggedIn, (req, res) => {
  let name = req.user.displayName;
  // res.redirect('/')
  res.send(`hello${name}`);
});

route.get('/auth/logout', (req,res) =>{
  req.session.destroy();
  res.send('see u again')
})

module.exports = route;
