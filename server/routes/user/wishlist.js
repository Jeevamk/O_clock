const express = require('express')
const route = express.Router()
const {auth,logauth} = require("../../middleware/auth_user");
const userCollection = require("../../model/user_model");
const productCollection = require("../../model/product_model")
const wishcollection= require("../../model/wish_model")


route.get('/', logauth, async (req, res) => {
    try {
        const userId = req.userId;
        const wishlistProducts = await wishcollection.find({ userId });

        const wishProducts = [];

        for (let newWish of wishlistProducts){
            const productId = newWish.productId

            const productContent = await productCollection.find({_id:productId})

            if(productContent){
                wishProducts.push({productContent,quantity:1})
            }
        }
        console.log(wishProducts);
        res.render('wish',{ wishProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//add product to the wishlist//
route.post('/', logauth , async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;
        // if (!userId){
        //     return res.render("user_login");
        // }

        const existingWish = await wishcollection.findOne({ userId, productId });

        if (existingWish) {
            return res.status(400).json({ message: 'Product already in wishlist' });

        }

        const newWish = new wishcollection({ userId, productId });
        const savedWish = await newWish.save();

        if (savedWish) {
            const _id = savedWish.productId;
            const product = await productCollection.findById(_id);

            return res.render('productDetails', { product });
        } else {
            return res.status(400).json({ message: 'Product not added to wishlist successfully' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//delete the product//
route.get("/delete/:id",logauth, async (req, res) => {
    
      const Idproduct = req.params._id;
  
      try {
        const product = await wishcollection.findOne({ Idproduct });
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ error: "product not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
      }
    
  });

  route.delete("/delete", logauth, async (req, res) => {
    try {
        const proId = req.body.id;
        await wishcollection.findByIdAndDelete(proId);
        res.status(204).send(); // 204 No Content: The server successfully processed the request, but there is no content to send.
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})
module.exports= route;