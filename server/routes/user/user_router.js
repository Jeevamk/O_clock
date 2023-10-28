const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const userCollection = require("../../model/user_model");
const bcrypt = require("bcrypt");
const keysecret = process.env.keySecret;
const auth = require("../../middleware/auth_user");
const bodyparser = require("body-parser");
const { body, validationResult } = require("express-validator");
const parserencoded = bodyparser.urlencoded({ extended: false });
// const session = require('express-session')

route.use(express.json());

route.get("/", (req, res) => {
  return res.render("user_index");
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
  //  parserencoded, [
  //     body('name')
  //         .notEmpty().withMessage('Name is required')
  //         .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

  //     body('email')
  //         .notEmpty().withMessage('Email is required')
  //         .isEmail().withMessage('Invalid email address')
  //         .normalizeEmail().withMessage('Invalid email format'),

  //     body('phone')
  //         .notEmpty().withMessage('phone number is required')
  //         .isLength({ min: 10 }).withMessage('phone number must be at least 10 characters')
  //         .matches(/^\d+$/).withMessage('Phone number can only contain digits'),

  //     body('password')
  //         .notEmpty().withMessage('Password is required')
  //         .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  //         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
  //         .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one digit'),

  //     body('cpassword')
  //         .notEmpty().withMessage('Confirm Password is required')
  //         .custom((value, { req }) => {
  //             if (value !== req.body.password) {
  //                 throw new Error('Passwords do not match');
  //             }
  //             return true;
  //         })

  // ]

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

//log in//
route.get("/userlogin", (req, res) => {
  const userName = req.cookies.userName;
  const key = req.cookies.sessions;
  if (key) {
    res.render("user_index", { userName });
  } else {
    res.render("user_login");
  }
});

route.post("/user_login", async (req, res) => {
  if (req.cookies.sessions) {
    res.redirect("/");
  } else {
    try {
      const { email, password } = req.body;

      const useremail = await userCollection.findOne({ email });
      console.log(useremail);

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
  const { currentpassword, newpassword , cnewpassword } = req.body;

  if (newpassword !== cnewpassword) {
    return res
      .status(400)
      .json({ success: false, message: "New password and confirm password do not match" });
  }

  try {
    const user = await userCollection.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
      // return res.status(404).render("password-change", { aler: true });
      
    }
    const passwordMatch = await bcrypt.compare(currentpassword, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Current password is incorrect" });
      // return res.status(401).render("profile", { alert: true });
    }

    user.password = newpassword;
    console.log(user.password);
    await user.save();
    res.clearCookie("sessions")
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

module.exports = route;
