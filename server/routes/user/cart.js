const express = require('express')
const route = express.Router()
const userCollection = require("../../model/user_model")
const productCollection = require("../../model/product_model")
const cartcollection = require("../../model/cart_model")
const { logauth } = require('../../middleware/auth_user')


route.get('/',logauth,async(req,res)=>{
    res.render('cart')
})


module.exports = route;