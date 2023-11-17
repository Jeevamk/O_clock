const express = require ('express')
const route = express.Router();
const {auth,logauth} = require("../../middleware/auth_user");
const userCollection = require("../../model/user_model");
const productCollection = require("../../model/product_model")


route.get("/",logauth, async (req, res) => {
    if (!req.cookies.sessions) return res.render("productDetails");
    const _id = req.userId
    const user = await userCollection.findById(_id)
    const products = await productCollection.find()

    return res.render("productDetails",{user,products});
  });




module.exports = route;