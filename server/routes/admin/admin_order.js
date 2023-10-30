const express = require('express');
const route = express.Router();
const orderCollection = require ('../../model/order_model');
const authenticateJWT = require ('../../middleware/auth');
const adminCollection = require("../../model/admin_model");

route.use(express.json());

route.get ('/',authenticateJWT,async (req,res)=>{ 
    if(req.cookies.session) {
        const adminid = await adminCollection.findOne({ _id: req.adminId });
        const orderList = await orderCollection.find();
        res.render('adminOrder', { adminid , orderList });

    }else {
        res.redirect("/adminhome");
    }

})


module.exports = route