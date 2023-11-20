const express = require('express')
const route = express.Router()
const adminCollection = require("../../model/admin_model");
const authenticateJWT = require("../../middleware/auth")
const bodyparser = require("body-parser");
const contactcollection = require("../../model/contact_model")

route.use(express.json())

route.get("/", authenticateJWT, async (req, res) => {
    if (req.cookies.session) {
      const adminid = await adminCollection.findOne({ _id: req.adminId });
      res.render("admin_contact", { adminid });
    }
  });



module.exports = route;