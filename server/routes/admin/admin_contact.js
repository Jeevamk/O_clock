const express = require('express')
const route = express.Router()
const adminCollection = require("../../model/admin_model");
const authenticateJWT = require("../../middleware/auth")
const bodyparser = require("body-parser");
const contactcollection = require("../../model/contact_model")
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config({path:'config.env'});

route.use(express.json())



route.get("/", authenticateJWT, async (req, res) => {
    if (req.cookies.session) {
      const adminid = await adminCollection.findOne({ _id: req.adminId });
      const contact = await contactcollection.find()
      res.render("admin_contact", { adminid,contact });
    }
  });


//get single data//
route.get("/:id",async (req,res)=>{
  if(req.cookies.session) {
    try{
      const contactId = req.params.id;
      const singleContact = await contactcollection.findOne({_id:contactId})
      if(singleContact) {
        return res.json(singleContact)
      }else{
        res.status(404).json({error:"message is not found"})
      }
    }catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  } else {
    res.redirect("/adminhome")
  }
})


//delete view //
route.get("/delete_message/:id",async (req,res)=>{
  if(req.cookies.session){
    const contactId = req.params.id;
    try{
      const contactDelete = await contactcollection.findOne({_id:contactId});

      if(contactDelete) {
        res.json(contactDelete)
      }else {
        res.status(404).json({error: "contact information is not found"})
      }

    }catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }else {
    res.redirect("/adminhome");
  }
})


route.delete("/delete_contact", async (req,res)=>{
  try{
    const contactId = req.body.id;
    await contactcollection.findByIdAndDelete(contactId);
    res.redirect(303, "/adminhome/contact");
  }catch (error) {
    res.send(error);
  }
 
})




module.exports = route;