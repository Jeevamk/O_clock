const express = require('express')
const route = express.Router()
const { logauth } = require("../../middleware/auth_user");
const userCollection = require("../../model/user_model")


route.get('/',logauth,async(req,res) => {
    const userId  = req.userId;
    const user = await userCollection.findById(userId);
    res.render("about",{user})
})

module.exports = route;