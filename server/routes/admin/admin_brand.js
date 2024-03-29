const express = require("express");
const route = express.Router();
const brandCollection = require("../../model/brand_model");
const authenticateJWT = require("../../middleware/auth");
const adminCollection = require("../../model/admin_model");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config({ path: "config.env" });
const upload = multer({ dest: 'assets/img/products' })

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



route.use(express.json());

route.get("/", authenticateJWT, async (req, res) => {
  if (req.cookies.session) {
    const adminid = await adminCollection.findOne({ _id: req.adminId });
    const brands = await brandCollection.find();
    res.render("adminBrand", { adminid, brands });
  } else {
    res.redirect("/adminhome");
  }
});

//add brand//

route.post("/", upload.single("logo"), async (req, res) => {
  try {
    
    const croppedlogo = req.body.croppedData
    const result = await cloudinary.uploader.upload(croppedlogo);

    const brand = new brandCollection({
      name: req.body.name,
      description: req.body.description,
      logo: result.url,

    });

    const savedBrand = await brand.save();

    if (!savedBrand) {
      return res.status(404).send("The brand cannot be created.");
    } else {
      return res.redirect("/adminhome/brands");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});


//view single data//

route.get("/:id", async (req, res) => {
  if (req.cookies.session) {
    const brandId = req.params.id;

    try {
      const brand = await brandCollection.findOne({ _id: brandId });
      if (brand) {
        res.json(brand);
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
    const brandId = req.params.id;

    try {
      const brandUpdate = await brandCollection.findOne({ _id: brandId });

      if (brandUpdate) {
        res.json(brandUpdate);
      } else {
        res.status(404).json({ error: "brand not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.redirect("/adminhome");
  }
});


route.put("/update", upload.single('logo'), async (req, res) => {
  const brandid = req.body.id;
  const result =req.file ? await cloudinary.uploader.upload(req.file.path):null;

  // const croppedLogoData = req.body.croppedLogoData;
  // const croppedResult = await cloudinary.uploader.upload(croppedLogoData);
 
  try {
    const {name,description} = req.body;
    const brandUpdate = await brandCollection.findByIdAndUpdate(
      { _id: brandid },
      { $set:  {
        name,description,
        ...(req.file &&{logo :result.url})
      }}
    );

    if (brandUpdate) {
      res.redirect(303, "/adminhome/brands");
    } else {
      res.status(404).json({ error: "brand not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete//

route.get("/delete_brand/:id", async (req, res) => {
  if (req.cookies.session) {
    const brandId = req.params.id;

    try {
      const brandDelete = await brandCollection.findOne({ _id: brandId });

      if (brandDelete) {
        res.json(brandDelete);
      } else {
        res.status(404).json({ error: "brand not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.redirect("/adminhome");
  }
});



route.delete("/delete_brand", async (req, res) => {
  try {
    const brandId = req.body.id;
    await brandCollection.findByIdAndDelete(brandId);
    res.redirect(303, "/adminhome/brands");
  } catch (error) {
    res.send(error);
  }
});


// route.delete("/delete_brand", async (req, res) => {
//   try {
//     const brandId = req.body.id;
//     const associatedProducts = await productCollection.find({ brandId: brandId });
//     for (let product of associatedProducts) {
//       await productCollection.findByIdAndDelete(product._id);
//     }
//     await brandCollection.findByIdAndDelete(brandId);

//     res.redirect(303, "/adminhome/brands");
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });


module.exports = route;
