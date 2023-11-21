const express = require ('express')
const route = express.Router();
const {auth,logauth} = require("../../middleware/auth_user");
const userCollection = require("../../model/user_model");
const contactcollection = require("../../model/contact_model");
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config({path:'config.env'})


async function mainMail(name,email,subject,message) {

  const trasnporter = nodemailer.createTransport({
    service: "Gmail",
    
    auth: {
      user: "jeevamk100@gmail.com",
      pass: "hexg nlyg mvit mqnt",
    },
  });

  const mailOption = {
    from :email,
    to:"jeevamk100@gmail.com",
    subject:subject,
    html:`you got a message from
    Email :${email}
    Name:${name}
    Message :${message}`,
  };
  try{
    await trasnporter.sendMail(mailOption);
    return Promise.resolve("Message sent Successfully!");

  }catch(err){
    return Promise.reject(err);
  }

}


route.get("/", async (req, res) => {

    return res.render("contact");
  });


route.post("/",async (req,res,next)=>{
  const {name,message,email,subject} = req.body;
  try {
    await mainMail(name,email,message,subject)

    const contact = new contactcollection({ name, email, message, subject });
    await contact.save();
    res.render("contact",{contactalert:true});
  }catch(error){
    res.send("Message could not be sent")
  } 
});






module.exports = route;