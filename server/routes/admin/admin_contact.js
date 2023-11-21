const express = require('express')
const route = express.Router()
const adminCollection = require("../../model/admin_model");
const authenticateJWT = require("../../middleware/auth")
const bodyparser = require("body-parser");
const contactcollection = require("../../model/contact_model")
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config({path:'config.env'});

route.use(express.json())

// async function mainMail(name,email,subject,message) {

//   const trasnporter = nodemailer.createTransport({
//     service: "Gmail",
    
//     auth: {
//       user: "jeevamk100@gmail.com",
//       pass: "hexg nlyg mvit mqnt",
//     },
//   });

//   const mailOption = {
//     from :"jeevamk100@gmail.com",
//     to:email,
//     subject:subject,
//     html:`you got a reply message from
//     Email :${email}
//     Name:${name}
//     Message :${message}`,
//   };
//   try{
//     await trasnporter.sendMail(mailOption);
//     return Promise.resolve("Message sent Successfully!");

//   }catch(err){
//     return Promise.reject(err);
//   }

// }


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



//reply//
// route.post("/reply/:id", async (req, res) => {
//   if (req.cookies.session) {
//     try {
//       const contactId = req.params.id;
//       const singleContact = await contactcollection.findOne({ _id: contactId });

//       if (!singleContact) {
//         return res.status(404).json({ error: "Message not found" })
//       }

//       const recipientEmail = singleContact.email;
//       console.log("Recipient email:", recipientEmail);

//       if (!recipientEmail) {
//         console.error("Recipient email is undefined");
//         return res.status(500).json({ error: "Recipient email is undefined" });
//       }

//       try {
//         await mainMail(recipientEmail, "Subject of the reply", "Your reply message");
//         res.status(200).json({ success: "Reply sent successfully" });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error sending reply email" });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" })
//     }
//   } else {
//     res.redirect("/adminhome")
//   }
// });


// route.post("/reply/:id", async (req, res) => {
//   if (req.cookies.session) {
//     try {
//       const contactId = req.params.id;
//       const singleContact = await contactcollection.findOne({ _id: contactId });

//       if (!singleContact) {
//         return res.status(404).json({ error: "Message not found" });
//       }

//       const recipientEmail = singleContact.email;
//       console.log("Recipient email:", recipientEmail);

//       if (!recipientEmail) {
//         console.error("Recipient email is undefined");
//         return res.status(500).json({ error: "Recipient email is undefined" });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
   
//   else {
//     res.redirect("/adminhome");
//   }

// });



module.exports = route;