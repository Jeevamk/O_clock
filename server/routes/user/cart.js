const express = require('express')
const route = express.Router()
const userCollection = require("../../model/user_model")
const productCollection = require("../../model/product_model")
const cartcollection = require("../../model/cart_model")
const { logauth ,wishauth} = require('../../middleware/auth_user')


route.get('/', logauth, async (req, res) => {
    res.render('cart')
    // try {
    //     const userId = req.userId;
    //     console.log(userId);
    //     const user = await userCollection.findById(userId);
    //     const cartProducts = await cartcollection.find({ userId });
    //     console.log(cartProducts);

    //     const cartItems = await Promise.all(cartProducts.map(async (newcart) => {
    //         const productId = newcart.productId;
    //         const productContent = await productCollection.find({ _id: productId });

    //         return productContent ? { productContent, quantity: 1 } : null;
    //     }));

    //     console.log("dfhushfui",cartItems);

    //     if (cartItems.length === 0 || cartItems[0].productContent.length === 0) {
    //         return res.render('cart',{emptyCart:true})
    //     }
    //     res.render('cart', { user, cartItems });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Internal server error' });
    // }
});


//post//
route.post('/',wishauth, async (req, res) => {
    try {
        const userId = req.userId;
        console.log(userId);
        const { productId } = req.body;
        // if (!userId){
        //     return res.render("user_login");
        // }

        const existingcart = await cartcollection.findOne({ userId, productId });

        if (existingcart) {
            return res.status(400).json({ message: 'Product already in cart' });

        }

        const cartItem = new cartcollection({ userId, productId });
        const savedcart = await cartItem.save();

        if (savedcart) {
            const _id = savedcart.productId;
            const product = await productCollection.findById(_id);

            return res.render('productDetails', { product });
        } else {
            return res.status(400).json({ message: 'Product not added to cart successfully' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = route;