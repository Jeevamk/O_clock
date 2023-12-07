const express = require('express')
const route= express.Router()
const userCollection = require('../../model/user_model')
const productCollection = require('../../model/product_model')
const orderCollection = require('../../model/order_model')
const checkoutCollection = require('../../model/checkout_model')
const { logauth } = require("../../middleware/auth_user");

route.get('/',logauth,async(req,res) =>{
    const userId= req.userId;
    const user = await userCollection.findById(userId)
    const orderDetails = await orderCollection.find({userId})
    console.log("orderdetails : ",orderDetails);
    const orderDatas = [];
    for (let orderDetail of orderDetails){
        console.log(orderDetail.orderproducts);
        for (let product of orderDetail.orderproducts){
            const productDetails = await productCollection.findOne({ _id: product.productId});
            const total = productDetails.price * product.quantity
            const status = orderDetail.orderStatus
            const quantity = product.quantity
            
            orderDatas.push({productDetails,total,status,quantity})

        }
    }

    res.render('orderSummary', {user,orderDatas,orderDetails})
})


module.exports = route;