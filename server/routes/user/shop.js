const express = require ('express')
const route = express.Router();
const {auth,logauth} = require("../../middleware/auth_user");
const userCollection = require("../../model/user_model");
const productCollection = require("../../model/product_model")
const brandCollection = require("../../model/brand_model")
const categoryCollection = require("../../model/category_model");




route.get("/", logauth, async (req, res) => {
  try {
    const _id = req.userId;
    const user = await userCollection.findById(_id);
    const products = await productCollection.find();
    const brands = await brandCollection.find();
    const category = await categoryCollection.find();

    return res.render("shop", { user, products, brands, category });
  } catch (error) {
    console.error("Error in shop route:", error);
    return res.status(500).send("Internal Server Error");
  }
});




  route.get('/:id', logauth, async (req, res) => {
    try {
      const userId = req.userId;
      const user = await userCollection.findById(userId);
  
      const _id = req.params.id;
      const product = await productCollection.findById(_id);
  
      const newArrival = await productCollection.find().sort({ createdDate: -1 });
      const newarrivalArray = newArrival.slice(0, 4);
  
      return res.render("productDetails", { product, user, newarrivalArray });
    } catch (error) {
      console.error("Error in product details route:", error);
      return res.status(500).send("Internal Server Error");
    }
  });
  


module.exports = route;