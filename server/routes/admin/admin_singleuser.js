const express = require('express')
const route  = express.Router();
const userCollection = require("../../model/user_model");
const authenticateJWT = require("../../middleware/auth");
const adminCollection = require("../../model/admin_model");
const orderCollection = require('../../model/order_model');
const productCollection = require('../../model/product_model')


// route.get("/:id", authenticateJWT, async (req, res) => {
  
//     if (req.cookies.session) {
//       const _id = req.params.id;
//       try {

//       const orders = await orderCollection.find({ userId: _id })
//       console.log("orders",orders);
//       const orderProductsArray = [];
      
//       for (const order of orders) {
//         const orderProducts = order.orderproducts;
//         orderProductsArray.push(orderProducts);
//       }
//       console.log("orderProductsArray:",orderProductsArray);
      
//       const adminid = await adminCollection.findOne({ _id: req.adminId });
//       const users = await userCollection.findById(_id);
//       res.render("adminSingleUser", { adminid, users,orders});
        
//       } catch (error) {
//         res.status(500).json({ error: "Internal server error" });

//       }
      
//     }
//   });


route.get("/:id", authenticateJWT, async (req, res) => {
  if (req.cookies.session) {
    const _id = req.params.id;
    try {
      const orders = await orderCollection.find({ userId: _id });
      console.log("orders", orders);

      const productDetailsArray = [];

      for (const order of orders) {
        for (const product of order.orderproducts) {
          const productId = product.productId;
          const quantity = product.quantity;
          const productDetails = await productCollection.findById(productId);
          productDetailsArray.push({ productDetails, quantity });
        }
      }

      console.log("productDetailsArray:", productDetailsArray);

      const adminid = await adminCollection.findOne({ _id: req.adminId });
      const users = await userCollection.findById(_id);
      res.render("adminSingleUser", { adminid, users, orders, productDetailsArray });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});




  

module.exports = route;