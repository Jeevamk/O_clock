const express = require("express");
const route = express.Router()
const authenticateJWT = require("../../middleware/auth");
const couponCollection = require("../../model/coupon_model")
const adminCollection = require("../../model/admin_model")


route.get("/", authenticateJWT, async (req, res) => {
    if (req.cookies.session) {
      const adminid = await adminCollection.findOne({ _id: req.adminId });
      const coupons = await couponCollection.find();
      res.render("adminCoupon", { adminid, coupons });
    } else {
      res.redirect("/adminhome");
    }
  });
  



module.exports = route;
