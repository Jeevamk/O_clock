const express = require('express')
const route = express.Router()
const userCollection = require("../../model/user_model")
const productCollection = require("../../model/product_model")
const cartcollection = require("../../model/cart_model")
const { logauth ,wishauth,cartauth} = require('../../middleware/auth_user')


route.get('/', cartauth, async (req, res) => {
    try {
        if (req.cookies.buynowproduct){
            res.clearCookie("buynowproduct")
            res.clearCookie("buynowquantity")
        }
        const userId = req.userId;

        
        const user = await userCollection.findById(userId);
        const cartProducts = await cartcollection.find({ userId });
        console.log(cartProducts);

        const cartItems = await Promise.all(cartProducts.map(async (newcart) => {
            const productId = newcart.productId;
            const quantity = newcart.quantity;
            const productContent = await productCollection.find({ _id: productId });

            return productContent ? { productContent, quantity } : null;
        }));


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
route.post('/',logauth, async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;
        const quantity =  req.body.quantity || 1;

        if (!userId){
            return res.status(304).json({error:'user not found'});
        }
        
        const existingcart = await cartcollection.findOne({ userId, productId });

        if (existingcart) {
            const product = await productCollection.findById(productId)
            if (existingcart.quantity < product.countStock){
                existingcart.quantity = parseInt(existingcart.quantity) + parseInt(quantity) ;
                const updatedCart = await existingcart.save();
                const msg = {msg:"item added to cart succesfully"}
                return res.json(msg);
            }else{
                const msg = {msg : `Only ${product.countStock} product available in stock`}
                return res.json(msg);
            }
        }

        const cartItem = new cartcollection({ userId, productId, quantity });
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


route.put('/updateQuantity',logauth, async (req,res)=>{
    const userId = req.userId;
    const {productId , newQuantity}  = req.body;

    try {
        const updatedProduct = await cartcollection.findOneAndUpdate({ userId, productId }, { quantity: newQuantity }, { new: true });
        res.json(updatedProduct);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
})



module.exports = route;