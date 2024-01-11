const express = require('express')
const route = express.Router()
const { logauth,wishauth } = require("../../middleware/auth_user");
const userCollection = require("../../model/user_model");
const checkoutCollection = require("../../model/checkout_model");
const cartcollection = require('../../model/cart_model');
const productCollection = require("../../model/product_model");
const couponCollection = require("../../model/coupon_model");
const orderCollection = require("../../model/order_model")


route.get('/', logauth, async (req, res) => {
    const userId = req.userId;
    const checkoutAddress = await checkoutCollection.find({ userId: userId })

    if (req.cookies.buynowproduct){
      const cartItems =[];
      const productId = req.cookies.buynowproduct;
      const quantity =parseInt(req.cookies.buynowquantity);
      const cartContent = await productCollection.find({ _id: productId });

      if(cartContent){
        cartItems.push({cartContent,quantity})
      }
      console.log("buynewo",cartItems,checkoutAddress);
      res.render("checkout", { checkoutAddress, cartItems })

    }else {
      const cartProducts = await cartcollection.find({ userId });
    
      const cartItems = await Promise.all(cartProducts.map(async (newcart) => {
        const productId = newcart.productId;
        const quantity = newcart.quantity;
        const cartContent = await productCollection.find({ _id: productId });
       
        return cartContent ? { cartContent, quantity } : null;
      }));
      
      res.render("checkout", { checkoutAddress, cartItems })
    }

    }

)


route.post('/', logauth, async (req, res) => {

  try {
    const userId = req.userId;
    const user = await userCollection.findById(userId)
    const checkoutAddress = await checkoutCollection.find({ userId })

    const cartProducts = await cartcollection.find({ userId });
    const cartItems = await Promise.all(cartProducts.map(async (newcart) => {
      const productId = newcart.productId;
      const quantity = newcart.quantity;

      const cartContent = await productCollection.find({ _id: productId });
      return cartContent ? { cartContent, quantity } : null;

    }));
    const grandTotal = req.body.checkoutvalue;

    res.render("checkout", { cartItems, user, grandTotal, checkoutAddress });
  }
  catch (error) {
    res.status(500).send("Internal Server Error");
  }
})


route.post('/address', logauth, async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, email, address, area, pincode, city, state, optionaladdress, addressId} = req.body;
    console.log('Address Data:', { name, phone, email, address, area, pincode, city, state, optionaladdress, addressId });

    if (addressId) {
      const existdata = await checkoutCollection.findOne({ userId, _id: addressId });

      if (existdata) {
       const editedData= await checkoutCollection.updateOne({ _id: addressId }, { $set: req.body});
       if(editedData){
         await checkoutCollection.findOne({ _id: addressId, userId });

       }
      }
      return res.redirect("/checkout");

    } else {
      const newCheckout = new checkoutCollection({
        userId, name, phone, email, address, area, pincode, city, state, optionaladdress
      });

      await newCheckout.save();
      
      return res.redirect("/checkout");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



//delete//
route.get("/delete/:id",logauth, async (req, res) => {
    
  const Idaddress = req.params.id;

  try {
    const address = await checkoutCollection.findOne({ _id:Idaddress });
    if (address) {
      res.json(address);
    } else {
      res.status(404).json({ error: "address not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});


route.delete("/delete", logauth, async (req, res) => {
  try {
      const addressId = req.body.id;
      const order = await orderCollection.find({addressId})
      if(order.length > 0){
        await orderCollection.deleteMany({addressId})
      }

      const deleteaddress = await checkoutCollection.findByIdAndDelete(addressId);
      return res.json(deleteaddress);   
  }
      catch (error) {
      res.status(500).json({ error: "Internal server error" });
  }
})


//buynow//
route.post("/buynow/:id", logauth, async (req, res) => {
  const userId = req.userId;

  if (!userId){
    return res.status(401).json({error:'user not found'});
  } else{
    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity);
    res.cookie("buynowproduct", productId);
    res.cookie("buynowquantity", quantity);
    res.json(productId);
  }

  
});


//coupon//
route.get('/coupon/:promoCode',logauth,async(req,res)=>{
  const userId = req.userId;
  const promoCode = req.params.promoCode; 
  const check = await couponCollection.findOne({promoCode:promoCode})
  if(check){
    const valid=check.startDate > new Date() < check.expDate;
    if(valid){
      res.json(check)
    }
    else {
      res.status(400).json({ error: 'Invalid coupon' });
    }
  }else {
    res.status(404).json({ error: 'Coupon not found' });
  }
})

module.exports = route;