const express = require ('express')
const route = express.Router()
const {logauth} = require("../../middleware/auth_user");
const userCollection = require("../../model/user_model");
const checkoutCollection = require("../../model/checkout_model");
const cartcollection = require('../../model/cart_model');
const productCollection = require("../../model/product_model");


route.get('/',async(req,res) =>{
  res.render("checkout")
})

route.post('/',logauth, async(req,res) =>{
 
  try {
    const userId = req.userId;
    const user = await userCollection.findById(userId)
    const checkoutAddress = await checkoutCollection.find({userId})
    console.log("jdhfjhf",checkoutAddress);

    console.log(userId);
    const cartProducts = await cartcollection.find({ userId });
    const cartItems = await Promise.all(cartProducts.map(async (newcart) => {
        const productId = newcart.productId;
        const quantity = newcart.quantity;

        const cartContent = await productCollection.find({ _id: productId });
        return cartContent ? { cartContent, quantity } : null;
       
    }));
    const grandTotal = req.body.checkoutvalue;
   
    console.log(cartItems);
    res.render("checkout", { cartItems , user , grandTotal , checkoutAddress});
} 
catch (error) {
    res.status(500).send("Internal Server Error");
}
})



route.post('/address',logauth, async(req,res) => {
  try {
    const userId = req.userId;
    const { name , phone , address , area , pincode , city , state , optionaladdress ,addressId ,grandTotal } = req.body;
    console.log('User ID:', userId);  
    console.log('Address Data:', { name, phone, address, area, pincode, city, state, optionaladdress, addressId });

    

    const newCheckout = new checkoutCollection ({
      userId, name , phone , address , area , pincode , city , state , optionaladdress
    })
    await newCheckout.save();

    const cartProducts = await cartcollection.find({ userId });
    const cartItems = await Promise.all(cartProducts.map(async (newcart) => {
        const productId = newcart.productId;
        const quantity = newcart.quantity;

        const cartContent = await productCollection.find({ _id: productId });
        return cartContent ? { cartContent, quantity } : null;
       
    }));

    res.render("checkout",{cartItems ,newCheckout ,grandTotal})
  } catch (error) {
    res.status(500).send('Internal Server Error');
}

})


module.exports = route;