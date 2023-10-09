const mongoose = require('mongoose');
const cookieParser = require ('cookie-parser');
const model = require("../model/admin_model");
const jwt = require('jsonwebtoken');
const secret = process.env.secretKey

function authenticateJWT(req, res, next) {
const token = req.cookies.session;
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  } else{
    jwt.verify(token, secret , (err, decodedToken) => {
        if (err) return res.status(401).render({ message: ' failed' });
        req.adminId = decodedToken.adminId;

        next();
      });
  } 
}


  

module.exports = authenticateJWT;
