const express = require("express");
const route = express.Router()
const authenticateJWT = require("../../middleware/auth");
const couponCollection = require("../../model/coupon_model")
const adminCollection = require("../../model/admin_model")

route.use(express.json());


route.get("/", authenticateJWT, async (req, res) => {
    if (req.cookies.session) {
      const adminid = await adminCollection.findOne({ _id: req.adminId });
      const coupons = await couponCollection.find();
      res.render("adminCoupon", { adminid, coupons });
    } else {
      res.redirect("/adminhome");
    }
  });
  

route.post('/', async(req,res) => {
  console.log()
  try {
    const coupons = new couponCollection ({
      promoCode: req.body.promoCode,
      couponType: req.body.couponType,
      profit: req.body.profit,
      startDate: req.body.startDate,
      expDate: req.body.expDate,


    }) 


    const coupon = await coupons.save();

    if (!coupon) {
      return res.status(404).send("the coupon can not be created");
    } else {
      return res.redirect("/adminhome/coupon");
    }

  } catch (error) {
    return res.status(500).send("Internal server error");
  }
})


module.exports = route;
