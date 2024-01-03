const express = require('express')
const route = express.Router()
const userCollection = require('../../model/user_model')
const cartcollection  =require('../../model/cart_model')
const checkoutCollection = require('../../model/checkout_model')
const productCollection = require('../../model/product_model')
const orderCollection = require('../../model/order_model')
const { logauth } = require("../../middleware/auth_user");
const Razorpay = require('razorpay')
const dotenv = require('dotenv').config({path:'config.env'});

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



route.get('/:id',logauth,async(req,res) =>{
    const userId = req.userId;
    const user = await userCollection.findById(userId)
    const addressId = req.params.id;
    const addressdata= await checkoutCollection.findById(addressId)
    
    if (req.cookies.buynowproduct){
      const cartItems =[];
      const productId = req.cookies.buynowproduct;
      const quantity =parseInt(req.cookies.buynowquantity);
      const cartContent = await productCollection.find({ _id: productId });

      if(cartContent){
        cartItems.push({cartContent,quantity})
      }
      console.log("buynow",cartItems,addressdata);
    res.render("payment", { addressdata, cartItems,user })

    }else {
      const cartProducts = await cartcollection.find({ userId });
    const cartItems = await Promise.all(cartProducts.map(async (newcart) => {
    const productId = newcart.productId;
    const quantity = newcart.quantity;

      const cartContent = await productCollection.find({ _id: productId });
      return cartContent ? { cartContent, quantity } : null;
    }));

    res.render('payment' , {cartItems ,user,addressdata })
    }
 
})



route.post('/',logauth,async(req,res) => {
    const userId = req.userId;
    const promoCode = req.body.couponId; 
    const check = await couponCollection.findOne({promoCode:promoCode})
    const addressId  = req.body.addressId;

    const checkoutData = await checkoutCollection.findById(addressId)
    console.log("address",checkoutData);
    
    res.json(checkoutData);

})



route.post('/create/orderId',async (req,res) =>{
  console.log("body:",req.body);
  var options = {
    amount: req.body.amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "rcp1"
  };
  instance.orders.create(options, function(err, order) {
    console.log("order:",order);
    const orderId = order.id;
    res.send({orderId})
  })
})


route.post("/payment/verify", (req,res) =>{
  let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

  var crypto = require('crypto');
  var expectedSignature = crypto.createHmac('sha256', 'q0VyF2K81WxgvDhSJpsMMtRw').update(body.toString()).digest('hex');

  var response = {"signatureIsvalid":"false"}
  if (expectedSignature === req.body.response.razorpay_signature)
  response={"signatureIsvalid":"true"}
  res.send(response);

})


module.exports = route;

