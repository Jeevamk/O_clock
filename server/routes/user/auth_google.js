const express = require ('express')
const route = express.Router();
const userCollection = require("../../model/user_model");



route.get('/google',(req,res)=>{
    res.send("login with google")
})











module.exports = route;