const express = require ('express')
const route = express.Router()
const userCollection = require('../../model/user_model')
const productCollection = require('../../model/product_model')
const cartcollection = require('../../model/cart_model')
const checkoutCollection = require('../../model/checkout_model')
const { logauth } = require("../../middleware/auth_user");
const orderCollection = require("../../model/order_model")

route.get('/',logauth,async(req,res) =>{
    res.render('orderplaced')
})


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

    res.render('orderplaced' , {cartItems ,user,addressdata })
})



// route.post('/',logauth,async(req,res) =>{
//     const userId = req.userId;
//     const orderId = req.body._id;


//     const orderData = await orderCollection.findById('orderdata')

//     res.json(orderData)
    
// })


module.exports = route;