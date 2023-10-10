const mongoose = require('mongoose');
const cookieParser = require ('cookie-parser');
const modelUser = require("../model/user_model");
const jwt = require('jsonwebtoken');
const keysecret = process.env.keySecret

function auth (req, res, next) {
const token = req.cookies.sessions;
  if (!token) {
    return res.redirect("/userlogin")
  } else{
    jwt.verify(token, keysecret , (err, decodedToken) => {
        if (err) return res.status(401).render({ message: ' failed' });
        req.userId = decodedToken.userId;
        next();
      });
  } 
}


  

module.exports = auth;