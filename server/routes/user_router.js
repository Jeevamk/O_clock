const express = require ('express');
const route = express.Router();
const authenticateJWT = require('../middleware/auth')




route.get('/',(req,res)=>{
    res.render('user_index')
})

route.get('/user_sign',(req,res)=>{
    res.render('user_signup')
})

route.get('/user_login',(req,res)=>{
    res.render('user_login')
})

module.exports = route