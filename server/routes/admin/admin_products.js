const express = require("express");
const route = express.Router();
const productCollection = require("../../model/product_model");
const adminCollection = require("../../model/admin_model");
const authenticateJWT = require("../../middleware/auth");
const multer = require("multer");
const categoryCollection = require("../../model/category_model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./assets/images/uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
route.use(express.json());

route.get("/", authenticateJWT, async (req, res) => {
  if (req.cookies.session) {
    const adminid = await adminCollection.findOne({ _id: req.adminId });
    const products = await productCollection.find();
    res.render("adminProducts", { adminid, products });
  } else {
    res.redirect("/adminhome");
  }
});

//add product//
route.post("/", upload.single("image"), async (req, res) => {
  try {
    // Retrieve the category ObjectId based on the category name
    const category = await categoryCollection.findOne({
      name: req.body.category,
    });

    if (!category) {
      return res.status(400).send("Invalid category");
    }

    const product = new productCollection({
      name: req.body.name,
      description1: req.body.description1,
      description2: req.body.description2,
      price: req.body.price,
      category: req.body.category,
      image: {
        data: req.file.filename,
        contentType: "image/jpg",
      },
      // images: {
      //     data:req.file.filename,
      //     contentType : 'image/jpg'
      // },
      brand: req.body.brand,
      color: req.body.color,
      reviews: req.body.reviews,
      gender: req.body.gender,
      createdDate: req.body.createdDate,
      countStock: req.body.countStock,
      material: req.body.material,
    });
    product == (await product.save());

    if (!product) {
      return res.status(404).send("product is not created");
    } else {
      return res.redirect("/adminhome/products");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = route;

//view single data//

route.get("/:id", async (req, res) => {
  if (req.cookies.session) {
    const productId = req.params.id;

    try {
      const product = await productCollection.findOne({ _id: productId });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: "brand not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  } else {
    res.redirect("/adminhome");
  }
});

