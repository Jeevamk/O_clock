const express = require('express')
const route = express.Router()
const userCollection = require("../../model/user_model")
const productCollection = require("../../model/product_model")
const cartcollection = require("../../model/cart_model")
const { logauth ,wishauth} = require('../../middleware/auth_user')


route.get('/', logauth, async (req, res) => {
    try {
        const userId = req.userId;
        console.log(userId);
        const user = await userCollection.findById(userId);
        const cartProducts = await cartcollection.find({ userId });
        console.log(cartProducts);

        const cartItems = await Promise.all(cartProducts.map(async (newcart) => {
            const productId = newcart.productId;
            const quantity = newcart.quantity;
            const productContent = await productCollection.find({ _id: productId });

            return productContent ? { productContent, quantity } : null;
        }));

        console.log(cartItems);

        if (cartItems.length === 0 || cartItems[0].productContent.length === 0) {
            return res.render('cart',{emptyCart:true})
        }
        res.render('cart', { user, cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//post//
route.post('/',wishauth, async (req, res) => {
    try {
        const userId = req.userId;
        console.log(userId);
        const { productId,quantity } = req.body;
        console.log(productId);
        // if (!userId){
        //     return res.render("user_login");
        // }

        const existingcart = await cartcollection.findOne({ userId, productId });

        if (existingcart) {
            existingcart.quantity =parseInt(existingcart.quantity) + parseInt(quantity) ;
            const updatedCart = await existingcart.save();
            return res.json(updatedCart);
        }

        const cartItem = new cartcollection({ userId, productId,quantity});
        const savedcart = await cartItem.save();

        if (savedcart) {
            return res.json(savedcart)
            // const _id = savedcart.productId;
            // const product = await productCollection.findById(_id);

            // return res.render('productDetails', { product });
        } else {
            return res.status(400).json({ message: 'Product not added to cart successfully' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//delete//
route.get("/delete/:id",logauth, async (req, res) => {
    
    const Idproduct = req.params.id;

    try {
      const product = await cartcollection.findOne({productId:Idproduct });
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
        await cartcollection.findByIdAndDelete(proId);
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = route;