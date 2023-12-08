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
        for (let product of orderDetail.orderproducts){
            const productDetails = await productCollection.findOne({ _id: product.productId});
            const total = productDetails.price * product.quantity
            const status = orderDetail.orderStatus
            const quantity = product.quantity
            
            orderDatas.push({productDetails,total,status,quantity,orderDetail})

        }
    }
    res.render('orderSummary', {user,orderDatas,orderDetails})
})


route.get('/:id',logauth,async(req,res) =>{
    const userId= req.userId;
    const user = await userCollection.findById(userId)
    const orderId = req.params.id;
    const myOrder = await orderCollection.findOne({_id:orderId})
    console.log("myorder",myOrder);
    const addressDetails = await checkoutCollection.findOne({_id:myOrder.addressId})
    console.log("addressDetails",addressDetails);
    // const orderproduct = myOrder.orderproducts;
    // console.log("orderpro",orderproduct);
    const orderData = []
    for (let myOrders of myOrder){
        for (let product of myOrders.orderproducts){
            const orderProduct = await productCollection.findOne({ _id: product.productId});
            const quantity = product.quantity


        }
        orderData.push({orderProduct,quantity})
    }
    
    res.render("orderDetail",{myOrder,addressDetails,user})
})



module.exports = route;