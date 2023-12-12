const express = require("express");
const route = express.Router();
const userCollection = require("../../model/user_model");
const productCollection = require("../../model/product_model");
const cartcollection = require("../../model/cart_model");
const checkoutCollection = require("../../model/checkout_model");
const { logauth } = require("../../middleware/auth_user");
const orderCollection = require("../../model/order_model");
const Razorpay = require('razorpay')
const dotenv = require('dotenv').config({path:'config.env'});




var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



route.get("/:id", logauth, async (req, res) => {
  const userId = req.userId;
  const user = await userCollection.findById(userId);
  const orderId = req.params.id; 
  const orderData = await orderCollection.findById(orderId)
  const address = await checkoutCollection.findById(orderData.addressId)
  console.log(orderData.grandtotal)

  const cartData = await cartcollection.find({ userId: userId });

  const orderproducts = await Promise.all(
    cartData.map(async (newcart) => {
      const productId = newcart.productId;
      const quantity = newcart.quantity;
      return  { productId, quantity } ;
    }));

    let Products=[];
    let grandtotal = 0;
    for (let orderproduct of orderproducts) {
        const productId = orderproduct.productId;
        const quantity = orderproduct.quantity;
        const productData = await productCollection.findById(productId);
        console.log(productData);
        Products.push({productData,quantity})

        grandtotal += productData.price * quantity;
        console.log("grand",grandtotal);
      }

       await cartcollection.deleteMany({ userId });
       res.render("orderplaced", {  user ,orderData , address , grandtotal, Products });
});


route.post("/", logauth, async (req, res) => {
  const userId = req.userId;
  const { addressDataId, paymentMethod } = req.body;
  const cartData = await cartcollection.find({ userId: userId });

  const orderproducts = await Promise.all(
    cartData.map(async (newcart) => {
      const productId = newcart.productId;
      const quantity = newcart.quantity;
      return  { productId, quantity } ;
    }));

    let Products=[];
    let grandtotal = 0;
    for (let orderproduct of orderproducts) {
        const productId = orderproduct.productId;
        const quantity = orderproduct.quantity;
        const productData = await productCollection.findById(productId);
        console.log(productData);
        Products.push({productData,quantity})
        console.log("price",productData.price);

        grandtotal += productData.price * quantity
        console.log("grand",grandtotal);
      }
      
  if (paymentMethod == "cashOn") {
    const orderData = new orderCollection({
      userId,
      paymentMethod,
      addressId: addressDataId,
      orderStatus: "order placed",
      orderproducts,
      grandtotal
      
    });
    await orderData.save();


    for (let orderproduct of orderproducts) {
        const productId = orderproduct.productId;
        const quantity = orderproduct.quantity;

        await productCollection.findByIdAndUpdate(
          productId,
          { $inc: { countStock: -quantity } }
        );
      }
     
      res.json(orderData);
  }
});


route.post('/create/orderId',async (req,res) =>{
  console.log("orderId:",req.body);
  var options = {
    amount: req.body.amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "rcp1"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
    res.send({ orderId : order.id })
  });
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
