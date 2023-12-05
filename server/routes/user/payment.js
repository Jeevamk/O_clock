const express = require('express')
const route = express.Router()
const userCollection = require('../../model/user_model')
const cartcollection  =require('../../model/cart_model')
const checkoutCollection = require('../../model/checkout_model')
const productCollection = require('../../model/product_model')
const { logauth } = require("../../middleware/auth_user");



route.get('/:id',logauth,async(req,res) =>{
    const userId = req.userId;
    const user = await userCollection.findById(userId)
    const addressId = req.params.id;
    const addressdata= await checkoutCollection.findById(addressId)
    console.log("dfdsf",addressdata.name);

    const cartProducts = await cartcollection.find({ userId });
    const cartItems = await Promise.all(cartProducts.map(async (newcart) => {
      const productId = newcart.productId;
      const quantity = newcart.quantity;

      const cartContent = await productCollection.find({ _id: productId });
      return cartContent ? { cartContent, quantity } : null;
    }));

    res.render('payment' , {cartItems ,user,addressdata })
})


route.post('/',logauth,async(req,res) => {
    const userId = req.userId;
    console.log("hdfsjusdh",req.body);
    const addressId  = req.body.addressId;
    // const user = await userCollection.findById(userId)

    const checkoutData = await checkoutCollection.findById(addressId)
    console.log("address",checkoutData);
    
    res.json(checkoutData);

})



module.exports = route;

