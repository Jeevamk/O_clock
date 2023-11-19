const express = require ('express')
const route = express.Router();
const {auth,logauth} = require("../../middleware/auth_user");
const userCollection = require("../../model/user_model");


route.get("/",logauth, async (req, res) => {
    if (!req.cookies.sessions) return res.render("contact");
    const _id = req.userId
    const user = await userCollection.findById(_id)

    return res.render("contact",{user});
  });




module.exports = route;