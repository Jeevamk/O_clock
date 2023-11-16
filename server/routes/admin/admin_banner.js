const express = require("express");
const route = express.Router();
const bannerCollection = require("../../model/banner_model");
const adminCollection = require("../../model/admin_model");
const authenticateJWT = require("../../middleware/auth");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config({ path: "config.env" });
const upload = multer({ dest: "assets/img/banners" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

route.use(express.json());

route.get("/", authenticateJWT, async (req, res) => {
  if (req.cookies.session) {
    const adminid = await adminCollection.findOne({ _id: req.adminId });
    const banners = await bannerCollection.find();
    res.render("adminBanner", { adminid, banners });
  } else {
    res.redirect("/adminhome");
  }
});

//add banner//
route.post("/", upload.single("bannerImg"), async (req, res) => {
  try {
    const croppedBannerData = req.body.croppedBannerData;
    console.log(croppedBannerData);
    const result = await cloudinary.uploader.upload(croppedBannerData);
    console.log(result);

    const banner = new bannerCollection({
      name: req.body.name,
      description: req.body.description,
      bannerImg: result.url,
      status:req.body.status,
      
    });
    const saveBanner = await banner.save();

    if (!saveBanner) {
        return res.status(404).send("The banner cannot be created.");
      } else {
        return res.redirect("/adminhome/banner");
      }

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

//view single data//

route.get("/:id", async (req, res) => {
    if (req.cookies.session) {
      const bannerId = req.params.id;
  
      try {
        const banner = await bannerCollection.findOne({ _id: bannerId });
        if (banner) {
          res.json(banner);
        } else {
          res.status(404).json({ error: "banner not found" });
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
      const bannerId = req.params.id;
  
      try {
        const bannerUpdate = await bannerCollection.findOne({ _id: bannerId });
  
        if (bannerUpdate) {
          res.json(bannerUpdate);
        } else {
          res.status(404).json({ error: "banner not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.redirect("/adminhome");
    }
  });


route.put("/update", upload.single('bannerImg'), async (req, res) => {
    console.log(req.file);
    const imgPath = req.file.path;
    const bannerid = req.body.id;
    const result = await cloudinary.uploader.upload(imgPath);
  
   
    try {
      const {name,description,createdDate,expireDate} = req.body
      const bannerUpdate = await bannerCollection.findByIdAndUpdate(
        { _id: bannerid },
        { $set:  {
          name,description,bannerImg : result.url
        }}
      );
  
      if (bannerUpdate) {
        res.redirect(303, "/adminhome/banner");
      } else {
        res.status(404).json({ error: "banner not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

//delete//
route.get("/delete_banner/:id", async (req, res) => {
    if (req.cookies.session) {
      const bannerId = req.params.id;
  
      try {
        const bannerDelete = await bannerCollection.findOne({ _id: bannerId });
  
        if (bannerDelete) {
          res.json(bannerDelete);
        } else {
          res.status(404).json({ error: "banner not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.redirect("/adminhome");
    }
  });


route.delete("/delete_banner", async (req, res) => {
    try {
      const bannerId = req.body.id;
      await bannerCollection.findByIdAndDelete(bannerId);
      res.redirect(303, "/adminhome/banner");
    } catch (error) {
      res.send(error);
    }
  });

module.exports = route;
