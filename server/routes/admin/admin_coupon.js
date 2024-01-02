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

//view single data//

route.get("/:id", async (req, res) => {
  if (req.cookies.session) {
    const couponId = req.params.id;

    try {
      const coupon = await couponCollection.findOne({ _id: couponId });
      if (coupon) {
        res.json(coupon);
      } else {
        res.status(404).json({ error: "coupon not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  } else {
    res.redirect("/adminhome");
  }
});


//edit//
route.get("/update/:id", async (req, res) => {
  if (req.cookies.session) {
    const couponId = req.params.id;

    try {
      const couponUpdate = await couponCollection.findOne({ _id: couponId });


      if (couponUpdate) {
        res.json(couponUpdate);
      } else {
        res.status(404).json({ error: "coupon not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.redirect("/adminhome");
  }
});


route.put("/update", authenticateJWT, async (req, res) => {
  const couponid = req.body.id;
  console.log("couponid:",couponid)
  const couponEditedData = req.body;
  try {
    const couponUpdate = await couponCollection.findByIdAndUpdate(
      { _id: couponid },
      { $set: couponEditedData }
    );

    if (couponUpdate) {
      res.redirect(303, "/adminhome/coupon");
    } else {
      res.status(404).json({ error: "coupon not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//delete//
route.get("/delete_coupon/:id", async (req, res) => {
  if (req.cookies.session) {
    const couponId = req.params.id;

    try {
      const couponDelete = await couponCollection.findOne({ _id: couponId });

      if (couponDelete) {
        res.json(couponDelete);
      } else {
        res.status(404).json({ error: "coupon not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.redirect("/adminhome");
  }
});


route.delete("/delete_coupon", async (req, res) => {
  try {
    const couponId = req.body.id;
    await couponCollection.findByIdAndDelete(couponId);
    res.redirect(303, "/adminhome/coupon");
  } catch (error) {
    res.send(error);
  }
});


module.exports = route;
