const express = require("express");
const route = express.Router();
const productCollection = require("../../model/product_model");
const adminCollection = require("../../model/admin_model");
const authenticateJWT = require("../../middleware/auth");
const multer = require("multer");
const categoryCollection = require("../../model/category_model");
const brandCollection = require("../../model/brand_model");
const dotenv = require("dotenv").config({ path: "config.env" });
const cloudinary = require("cloudinary").v2;
const upload = multer({ dest: 'assets/img/products' })

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Middleware to handle image uploads
// const handleImageUpload = async (req, res, next) => {
//   try {
//     const images =req.files;
//     const imageUrls = [];

//     for (const image of images) {
//       const result = await cloudinary.uploader.upload(image.path);
//       imageUrls.push(result.secure_url);
//     }

//     req.imageUrls = imageUrls; 
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to upload images' });
//   }
// };



route.use(express.json());

route.get("/", authenticateJWT, async (req, res) => {
  if (req.cookies.session) {
    const adminid = await adminCollection.findOne({ _id: req.adminId });
    const products = await productCollection.find();
    const brands = await brandCollection.find();
    const category = await categoryCollection.find({},'name');
    res.render("adminProducts", { adminid, products, brands, category });
  } else {
    res.redirect("/adminhome");
  }
});

//add product//
route.post("/", upload.fields([{name:"images", maxCount:1},{ name :'images1' ,maxCount:1},{name :'images2', maxCount:1},{name:'images3',maxCount:1}]), async (req, res) => {
  try {
    const croppedMainImage = req.body.croppedProductData
    const croppedImage1 = req.body.croppedProduct1Data
    const croppedImage2 = req.body.croppedProduct2Data
    const croppedImage3 = req.body.croppedProduct3Data

    const mainImage=await cloudinary.uploader.upload(croppedMainImage)
    const Imageone=await cloudinary.uploader.upload(croppedImage1)
    const Imagetwo=await cloudinary.uploader.upload(croppedImage2)
    const Imagethree=await cloudinary.uploader.upload(croppedImage3)


    const product = new productCollection({
      name: req.body.name,
      description1: req.body.description1,
      description2: req.body.description2,
      price: req.body.price,
      category: req.body.category,
      images: mainImage.url,
      images1: Imageone.url,
      images2: Imagetwo.url,
      images3: Imagethree.url,
      brand: req.body.brand,
      color: req.body.color,
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

//edit//

route.get("/update/:id", async (req, res) => {
  if (req.cookies.session) {
    const productId = req.params.id;
    // const brands = await brandCollection.find();
    // const category = await categoryCollection.find();

    try {
      const productUpdate = await productCollection.findOne({ _id: productId });

      if (productUpdate) {
        res.json(productUpdate);
      } else {
        res.status(404).json({ error: "product not found" });
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
  const productid = req.body.id;
  const productUpdateData = req.body;
  try {
    const productUpdate = await productCollection.findByIdAndUpdate(
      { _id: productid },
      { $set: productUpdateData }
    );

    if (productUpdate) {
      res.redirect(303, "/adminhome/products");
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete//

route.get("/delete_product/:id", async (req, res) => {
  if (req.cookies.session) {
    const productId = req.params.id;

    try {
      const productDelete = await productCollection.findOne({ _id: productId });

      if (productDelete) {
        res.json(productDelete);
      } else {
        res.status(404).json({ error: "product not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.redirect("/adminhome");
  }
});

route.delete("/delete_product", async (req, res) => {
  try {
    const productId = req.body.id;
    await productCollection.findByIdAndDelete(productId);
    res.redirect(303, "/adminhome/products");
  } catch (error) {
    res.send(error);
  }
});

module.exports = route;
