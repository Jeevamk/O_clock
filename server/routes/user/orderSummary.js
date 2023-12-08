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
    const addressDetails = await checkoutCollection.findById(myOrder.addressId)
    console.log("addressDetails",addressDetails);
    const orderData = []
    let total = 0;
    
        for (let product of myOrder.orderproducts){
            const orderProduct = await productCollection.findOne({ _id: product.productId});
            const quantity = product.quantity;
            console.log(orderProduct);
            total += orderProduct.price * quantity
            console.log("grand",total);

            orderData.push({orderProduct,quantity,total})

    
        }

    res.render("orderDetail",{myOrder,addressDetails,user,orderData,total})
})



module.exports = route;