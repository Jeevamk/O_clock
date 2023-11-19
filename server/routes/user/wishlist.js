const express = require('express')
const route = express.Router()
const {auth,logauth} = require("../../middleware/auth_user");
const userCollection = require("../../model/user_model");
const productCollection = require("../../model/product_model")
const wishcollection= require("../../model/wish_model")


route.get('/',logauth,async(req,res) =>{
    // const userId = req.userId;
    // const wishProduct = await wishcollection.find({userId});

    res.render('wishlist')
})

// route.post('/',logauth, async (req, res) => {
//     try {
//       const { productId } = req.body;
//       const userId = req.userId; 
      
//       const WishProduct = new wishcollection ({ userId, productId });
//       const WishSave = await WishProduct.save()
  
//       if (WishSave) {
//         const _id = WishSave.productId;
//         const product = await productCollection.findById(_id)
//         res.render("productDetails",{product})
//       }else {
//         return res.status(400).json({ message: 'Product do not added to wishlist successfully' });
//       }

//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   });

route.post('/', logauth, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;

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


module.exports= route;