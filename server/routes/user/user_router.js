const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const userCollection = require("../../model/user_model");
const bcrypt = require("bcrypt");
const keysecret = process.env.keySecret;
const {auth,logauth} = require("../../middleware/auth_user");
const bodyparser = require("body-parser");
const { body, validationResult } = require("express-validator");
const parserencoded = bodyparser.urlencoded({ extended: false });
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { token } = require("morgan");
const twilio = require('twilio');
const dotenv = require('dotenv').config({path:'config.env'});
const otpCollection = require("../../model/otpPhone_model");
// const session = require('express-session')

//twilio//
const accountSid = process.env.TWILIO_ACCOUNT_SID ;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.twilioPhoneNumber;
const twilioClient = twilio(accountSid, authToken);


const trasnporter = nodemailer.createTransport({
  service: "Gmail",
  // host: " 192.168.1.13",
  // port: 587,
  // secure: false,
  // requireTLS: true,
  auth: {
    user: "jeevamk100@gmail.com",
    pass: "hexg nlyg mvit mqnt",
  },
});

const sendResetPasswordMail = (email, token) => {
  return new Promise((resolve, reject) => {
    try {
      const mailoptions = {
        from: "jeevamk100@gmail.com",
        to: email,
        subject: "For Reset Password",
        html: `<p> Hii , Please copy the link and reset password:</p><h1>${token}</h1>`,
      };
      trasnporter.sendMail(mailoptions, (error, info) => {
        if (error) {
          console.log(error);
          return reject(error)
          
        } else {
          console.log("mail has been sent");
          resolve (info.response)
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, msg: error.message });
    }
  })
  
};

route.use(express.json());


//indexpage//

route.get("/",logauth, async (req, res) => {
  if (!req.cookies.sessions) return res.render("user_index");
  const _id = req.userId
  const user = await userCollection.findById(_id)
  return res.render("user_index",{user});
});


route.get("/user", (req, res) => {
  
  if (!req.cookies.sessions) {
    return res.render("user_login");
  }
  return res.redirect("/profile");
});


//signup//
route.get("/user_sign", (req, res) => {
  if (req.cookies.sessions) return res.redirect("/");
  res.render("user_signup");
});


route.post(
  "/user_registration",

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = errors.array();
      const firsterr = err[0];

      return res.render("user_signup", { errors: firsterr });
    }
    try {
      const password = req.body.password;
      const cpassword = req.body.cpassword;

      if (password === cpassword) {

        const userData = new userCollection({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
          cpassword: req.body.cpassword,
          status: req.body.status,
        });

        const postingData = await userData.save();
        res.render("user_login");
      } else {
        res.render("user_signup");
        res.status(400);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
);

//otp login//
// route.post(
//   "/user_registration",

//   async (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       const err = errors.array();
//       const firsterr = err[0];

//       return res.render("user_signup", { errors: firsterr });
//     }
//     try {
//       const password = req.body.password;
//       const cpassword = req.body.cpassword;

//       if (password === cpassword) {
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         console.log(otp);
//         let userData;
//         if(otp){
//           userData = new userCollection({
//             name: req.body.name,
//             email: req.body.email,
//             phone: req.body.phone,
//             password: req.body.password,
//             cpassword: req.body.cpassword,
//             status: req.body.status,
//           });
  
//         }

//         const postingData = await userData.save();
//         try {
//           const phNumber = req.body.phone;
//           const phone = `+91${phNumber}`
//           await twilioClient.messages.create({
//             body: `Your OTP is: ${otp}`,
//             to: phone,
//             from: twilioPhone
//           });

          
//           res.render('otpPhone', { phone: req.body.phone });
//         } catch (twilioError) {
//           console.error('Twilio Error:', twilioError);
//           res.status(500).send('Error sending OTP');
//         }
//         // res.render("user_login");
//       } else {
//         res.render("user_signup");
//         res.status(400);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }
// );



route.post("/user_login", async (req, res) => {
  if (req.cookies.sessions) {
    res.redirect("/");
  } else {
    try {
      const { email, password } = req.body;

      const useremail = await userCollection.findOne({ email });
      

      if (!useremail) {
        return res.render("user_login", { show: true });
      }
      if (useremail.status === "Block") {
        return res.render("user_login", { blocked: true });
      } else {
        const passMatch = await bcrypt.compare(password, useremail.password);
        if (!passMatch)
          return res.status(401).render("user_login", { alert: true });
        const token = jwt.sign({ userId: useremail._id }, keysecret);
        res.cookie("sessions", token);
        return res.redirect("/");
      }
    } catch (err) {
      res.send(err);
    }
  }
});


//profile//
route.get("/profile", auth, async (req, res) => {
  if (req.cookies.sessions) {
    try {
      const userDetail = await userCollection.findOne({ _id: req.userId });
      if (!userDetail) {
        return res.status(404).send("User not found");
      }
      res.render("user_profile", { user: userDetail });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.redirect("/userlogin");
  }
});

//edit//

route.put("/edit", auth, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const updateUser = await userCollection.findByIdAndUpdate(
      { _id: userId },
      { $set: req.body }
    );

    res.cookie("editToken", updateUser);
    res.json(updateUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//delete//

// route.get('/delete/:id', auth, async (req, res) => {
//     try {
//         const userId = req.params.id;
//         await userCollection.findByIdAndDelete(userId);
//         res.clearCookie('sessions');
//         res.redirect('/');

//     }
//     catch (error) {
//         res.send(error);
//     }
// })

// logout//
route.get("/user_logout", (req, res) => {
  const key = req.cookies.sessions;
  if (key) {
    res.clearCookie("sessions");
    res.redirect("/");
  } else {
    res.render("user_login");
  }
});

//change password//

route.put("/password-change", async (req, res) => {
  const userId = req.body._id;
  const { currentpassword, newpassword, cnewpassword } = req.body;

  if (newpassword !== cnewpassword) {
    return res.status(400).json({
      success: false,
      message: "New password and confirm password do not match",
    });
  }

  try {
    const user = await userCollection.findById(userId);

    const passwordMatch = await bcrypt.compare(currentpassword, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Current password is incorrect" });
    }

    user.password = newpassword;
    console.log(user.password);
    await user.save();
    res.clearCookie("sessions");
    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Password change failed" });
  }
});


//forgot password//


route.get("/forgotpassword", (req, res) => {
  res.render("forgotpassword");
});

route.post("/forget-password", async (req, res) => {
  const email = req.body.email;
  try {
    const userData = await userCollection.findOne({ email });
    console.log(userData); 
    if (userData.status == 'active') {
      const randomString = randomstring.generate({ length: 5 });
      console.log(randomString);
      const randomtoken =await sendResetPasswordMail(email,randomString);
      if(randomtoken){
        const data = await userCollection.findOneAndUpdate(
          { email:email },
          { $set: { token: randomString } }
        );
        console.log(data);

        if(data){
          const _id = await data._id
          res.render("token" ,{_id});

        }
      }
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: err.message });
  }
});

route.get("/token", (req, res) => {
  res.render("token");
});


route.post("/token-password", async (req, res) => {
  try {
    const token = req.body.token;
    const _id = req.body.id;

    const tokenData = await userCollection.findOne( { _id } );
    if(token==tokenData.token){
      const _id = tokenData._id;
      res.render('reset', {_id} )
    }else {
      res.status(400).send({ success: false, msg: "Invalid token." });
      // res.render('token', {tokenalert:true})
    }
    // console.log(tokenData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, msg: error.message });
  } 
});



route.post("/reset-password", async (req, res) => {
  const userId = req.body._id;
  console.log(userId);
  const newpass = req.body.newpass;
  const cnewpass = req.body.cpass;

  if (newpass === cnewpass) {
    try {
      const user = await userCollection.findById(userId);

      if (!user) {
        return res.status(404).send("User not found");
      }

      user.password = newpass;
      await user.save();
      res.render("user_login");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(400).send("Passwords do not match");
  }
});


module.exports = route;
