const express = require('express')
const route = express.Router()
const {auth,logauth,wishauth} = require("../../middleware/auth_user");
const userCollection = require("../../model/user_model");
const productCollection = require("../../model/product_model")
const wishcollection= require("../../model/wish_model")


// route.get('/', logauth, async (req, res) => {
//     try {
//         const userId = req.userId;
//         const user = await userCollection.findById(userId)
//         const wishlistProducts = await wishcollection.find({ userId });

//         const wishProducts = [];

//         for (let newWish of wishlistProducts){
//             const productId = newWish.productId

//             const productContent = await productCollection.find({_id:productId})

//             if(productContent){
//                 wishProducts.push({productContent,quantity:1})
//             }
//         }
//         console.log(wishProducts);
//         res.render('wish',{user, wishProducts});
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

route.get('/', logauth, async (req, res) => {
    try {
        const userId = req.userId;
        if(userId==undefined) {
            return res.redirect('/user')
        }
        const user = await userCollection.findById(userId);
        const wishlistProducts = await wishcollection.find({ userId });

        const wishProducts = await Promise.all(wishlistProducts.map(async (newWish) => {
            const productId = newWish.productId;
            const productContent = await productCollection.find({ _id: productId });

            return productContent ? { productContent, quantity: 1 } : null;

        }));
        console.log(wishProducts);

        if (wishProducts.length === 0 || wishProducts[0].productContent.length === 0) {
            return res.render('wish',{empty:true})
        }
        res.render('wish', { user, wishProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



//add product to the wishlist//
route.post('/',logauth, async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        if (!userId){
            return res.status(401).json({error:'user not found'});
        }

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
            return res.status(400).json({ message: 'Product not added to wishlist'});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});




//delete the product//
route.get("/delete/:id",logauth, async (req, res) => {
    
      const Idproduct = req.params.id;
      console.log(Idproduct);
  
      try {
        const product = await wishcollection.findOne({ productId:Idproduct });
        console.log(product);
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
        const userId = req.userId;
        const proId = req.body.id;
        console.log("proId",proId);
        const deleteproduct = await wishcollection.deleteOne({productId:proId,userId:userId});
        return res.json(deleteproduct)    
    }
        catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})



module.exports= route;