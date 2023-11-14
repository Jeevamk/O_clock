const express = require('express')
const route  = express.Router();
const userCollection = require("../../model/user_model");
const authenticateJWT = require("../../middleware/auth");
const adminCollection = require("../../model/admin_model");
const orderCollection = require('../../model/order_model');
const productCollection = require('../../model/product_model')


route.get("/:id", authenticateJWT, async (req, res) => {
  
    if (req.cookies.session) {
      const _id=req.params.id;
      const orders = await orderCollection.find({ userId: _id })
      const orderDetail = orders[0]
      const productId = orders[0].productId;
      const orderProduct = await productCollection.findById(productId)
      console.log(productId);
      console.log(orderProduct);
      const adminid = await adminCollection.findOne({ _id: req.adminId });
      const users = await userCollection.findById(_id);
      res.render("adminSingleUser", { adminid, users, orderProduct,orders,orderDetail});
      // console.log(users);
    }
  });


  

module.exports = route;