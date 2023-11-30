const express = require ('express')
const route = express.Router()
const {auth,logauth} = require("../../middleware/auth_user");
const userCollection = require("../../model/user_model");
const checkoutCollection = require("../../model/checkout_model")


route.get("/",logauth, async (req, res) => {
    const userId = req.userId;
        const user = await userCollection.findById(userId)
  
      return res.render("checkout",{user});
    });

module.exports = route;