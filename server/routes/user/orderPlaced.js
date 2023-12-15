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





route.get("/:id", logauth, async (req, res) => {
  const userId = req.userId;
  const user = await userCollection.findById(userId);
  const orderId = req.params.id; 
  const orderData = await orderCollection.findById(orderId)
  const address = await checkoutCollection.findById(orderData.addressId)
  if(req.cookies.buynowproduct){

    const cartItems =[];
    const productId = req.cookies.buynowproduct;
    const quantity =parseInt(req.cookies.buynowquantity);
    const cartContent = await productCollection.find({ _id: productId });

    if(cartContent){
      cartItems.push({cartContent,quantity})
    }

    let Products =[]
    let grandtotal = 0;

        
        const productData = await productCollection.findById(productId);
        console.log(productData);
        Products.push({productData,quantity})

        grandtotal += productData.price * quantity
        console.log("grand",grandtotal);
        res.clearCookie("buynowproduct")
        res.clearCookie("buynowquantity")
       res.render("orderplaced", {  user ,orderData , address , grandtotal, Products });

  }else{

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

  }
  
});



route.post("/", logauth, async (req, res) => {
  const userId = req.userId;
  const { addressDataId, paymentMethod } = req.body;
  const addressdata = await checkoutCollection.findById(addressDataId)
  console.log("addressDataId",addressdata);
   
  if (req.cookies.buynowproduct){
    const cartItems =[];
    const productId = req.cookies.buynowproduct;
    const Quantity =parseInt(req.cookies.buynowquantity);
    const cartContent = await productCollection.find({ _id: productId });


    if(cartContent){
      cartItems.push({cartContent,Quantity})
    }

    let Products =[]
    let grandtotal = 0;

        const productid =  cartItems[0].cartContent;
        const quantity = cartItems[0].Quantity;
        const productData = await productCollection.findById(productid);
        Products.push({productData,quantity})
        const orderproducts=[{productId:productData._id,quantity}]
        grandtotal += productData.price * quantity
        console.log("grand",grandtotal);
  if (paymentMethod == "cashOn") {
    const orderData = new orderCollection({
      userId,
      paymentMethod,
      addressId: addressDataId,
      orderStatus: "Order placed",
      orderproducts,
      grandtotal
      
    });
    await orderData.save();
  
    const productid =  cartItems[0].cartContent;
    const quantity = cartItems[0].Quantity;
    
    await productCollection.findByIdAndUpdate(
      productid,
            { $inc: { countStock: -Quantity } }
          );
     
      res.json(orderData); 
  } 
  
  else {
    const orderData = new orderCollection({
      userId,
      paymentMethod,
      addressId: addressDataId,
      orderStatus: "Order placed",
      orderproducts,
      grandtotal
      
    });
    await orderData.save();
   

    const productid =  cartItems[0].cartContent;
    const Quantity = cartItems[0].quantity;
    await productCollection.findByIdAndUpdate(
      productid,
            { $inc: { countStock: -Quantity } }
          );
     
      res.json(orderData);
  }

  }else {

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
      orderStatus: "Order placed",
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
  
  else {
    const orderData = new orderCollection({
      userId,
      paymentMethod,
      addressId: addressDataId,
      orderStatus: "Order placed",
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

  }

  // const cartData = await cartcollection.find({ userId: userId });

  // const orderproducts = await Promise.all(
  //   cartData.map(async (newcart) => {
  //     const productId = newcart.productId;
  //     const quantity = newcart.quantity;
  //     return  { productId, quantity } ;
  //   }));

  //   let Products=[];
  //   let grandtotal = 0;
  //   for (let orderproduct of orderproducts) {
  //       const productId = orderproduct.productId;
  //       const quantity = orderproduct.quantity;
  //       const productData = await productCollection.findById(productId);
  //       console.log(productData);
  //       Products.push({productData,quantity})
  //       console.log("price",productData.price);

  //       grandtotal += productData.price * quantity
  //       console.log("grand",grandtotal);
  //     }
      
  // if (paymentMethod == "cashOn") {
  //   const orderData = new orderCollection({
  //     userId,
  //     paymentMethod,
  //     addressId: addressDataId,
  //     orderStatus: "order placed",
  //     orderproducts,
  //     grandtotal
      
  //   });
  //   await orderData.save();

  //   for (let orderproduct of orderproducts) {
  //       const productId = orderproduct.productId;
  //       const quantity = orderproduct.quantity;

  //       await productCollection.findByIdAndUpdate(
  //         productId,
  //         { $inc: { countStock: -quantity } }
  //       );
  //     }
     
  //     res.json(orderData);
  // } 
  
  // else {
  //   const orderData = new orderCollection({
  //     userId,
  //     paymentMethod,
  //     addressId: addressDataId,
  //     orderStatus: "order placed",
  //     orderproducts,
  //     grandtotal
      
  //   });
  //   await orderData.save();

  //   for (let orderproduct of orderproducts) {
  //       const productId = orderproduct.productId;
  //       const quantity = orderproduct.quantity;

  //       await productCollection.findByIdAndUpdate(
  //         productId,
  //         { $inc: { countStock: -quantity } }
  //       );
  //     }
     
  //     res.json(orderData);
  // }
});





module.exports = route;
