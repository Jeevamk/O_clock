const express = require('express')
const route = express.Router()
const {logauth} = require('../../middleware/auth_user')
const userCollection = require('../../model/user_model')
const checkoutCollection = require('../../model/checkout_model')

route.get('/',logauth,async(req,res)=>{
    const userId = req.userId
    const user = await userCollection.findById(userId)
    const addresses = await checkoutCollection.find({userId})
    console.log(addresses);
    res.render('myaddress',{user,addresses})
})


route.post('/', logauth, async (req, res) => {
    try {
      const userId = req.userId;
      const { name, phone, email, address, area, pincode, city, state, optionaladdress, addressId, grandTotal } = req.body;
      console.log('User ID:', userId);
      console.log('Address Data:', { name, phone, email, address, area, pincode, city, state, optionaladdress, addressId });
  
      if (addressId) {
        const existdata = await checkoutCollection.findOne({ userId, _id: addressId });
  
        if (existdata) {
         const editedData= await checkoutCollection.updateOne({ _id: addressId }, { $set: req.body });
         if(editedData){
           await checkoutCollection.findOne({ _id: addressId, userId });
  
         }
        }
        return res.redirect("/myaddress");
  
      } else {
        const newCheckout = new checkoutCollection({
          userId, name, phone, email, address, area, pincode, city, state, optionaladdress
        });
  
        await newCheckout.save();
        
        return res.redirect("/myaddress");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

  //delete//
route.get("/delete/:id",logauth, async (req, res) => {
    
    const Idaddress = req.params.id;
    console.log(Idaddress);
  
    try {
      const address = await checkoutCollection.findOne({ _id:Idaddress });
      console.log(address);
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
        const addrsId = req.body.id;
  
        const deleteaddress = await checkoutCollection.findByIdAndDelete(addrsId);
        return res.json(deleteaddress)    
    }
        catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
  })
  

module.exports = route;