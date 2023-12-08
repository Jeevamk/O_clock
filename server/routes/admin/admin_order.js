const express = require('express');
const route = express.Router();
const orderCollection = require ('../../model/order_model');
const authenticateJWT = require ('../../middleware/auth');
const adminCollection = require("../../model/admin_model");
const userCollection = require("../../model/user_model")
const productCollection = require("../../model/product_model")
const checkoutCollection = require("../../model/checkout_model")

route.use(express.json());

route.get ('/',authenticateJWT,async (req,res)=>{ 
    if(req.cookies.session) {
        const adminid = await adminCollection.findOne({ _id: req.adminId });
        const orderList = await orderCollection.find();
        console.log("orderlist",orderList);

        const userDetails = [];
        for (let order of orderList) {
            const user  = await userCollection.findOne({_id:order.userId})
            const userName = user.name;
            order.userName = userName;
            
            userDetails.push(user,userName)

            console.log("user",userDetails);
        }
        res.render('adminOrder', { adminid , orderList,userDetails });

    }else {
        res.redirect("/adminhome");
    }

})


module.exports = route