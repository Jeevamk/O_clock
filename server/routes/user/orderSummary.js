const express = require('express')
const route= express.Router()
const userCollection = require('../../model/user_model')
const productCollection = require('../../model/product_model')
const orderCollection = require('../../model/order_model')
const checkoutCollection = require('../../model/checkout_model')
const { logauth } = require("../../middleware/auth_user");


route.get('/',logauth,async(req,res) =>{
    const userId= req.userId;
    const user = await userCollection.findById(userId)
    const orderDetails = await orderCollection.find({ userId }).sort({ orderDate: -1 });
    const orderDatas = [];
    for (let orderDetail of orderDetails){
        for (let product of orderDetail.orderproducts){
            const productDetails = await productCollection.findOne({ _id: product.productId});
            const total = productDetails.price * product.quantity
            const status = orderDetail.orderStatus
            const quantity = product.quantity
            
            orderDatas.push({productDetails,total,status,quantity,orderDetail})

        }
    }
    res.render('orderSummary', {user,orderDatas,orderDetails})
})


route.get('/:id',logauth,async(req,res) =>{
    const userId= req.userId;
    const user = await userCollection.findById(userId)
    const orderId = req.params.id;
    const myOrder = await orderCollection.findOne({_id:orderId})
    console.log("myorder",myOrder);
    const addressDetails = await checkoutCollection.findById(myOrder.addressId)
    console.log("addressDetails",addressDetails);
    const orderData = []
    let total = 0;
    
        for (let product of myOrder.orderproducts){
            const orderProduct = await productCollection.findOne({ _id: product.productId});
            const quantity = product.quantity;
            console.log(orderProduct);
            total += orderProduct.price * quantity
            console.log("grand",total);

            orderData.push({orderProduct,quantity,total})
        }

        let Orderplaced = false;
        let shipped = false;
        let deliverd = false;
        let Outofdelivery = false;
        let Cancelled = false;


        if (myOrder.orderStatus == "Order placed"){
          Orderplaced =true 
        }else if (myOrder.orderStatus == "Shipped"){
          shipped =true
        }else if (myOrder.orderStatus == "Deliverd"){
          deliverd = true
        }else if (myOrder.orderStatus == "Outof delivery"){
          Outofdelivery = true
        }else {
          Cancelled = true
        }

    res.render("orderDetail",{myOrder,addressDetails,user,orderData,total,Cancelled,Orderplaced,shipped,deliverd,Outofdelivery})
})


//cancel//
route.get('/cancel/:id',logauth, async(req,res) =>{
    
        const orderId = req.params.id;

        try {
            const cancelorder = await orderCollection.findOne({_id : orderId})

            if(cancelorder) {
                return res.json(cancelorder)
            }else {
                res.status(404).json({error : "Order not found"})
            }

        } catch (error) {
            res.status(500).json({error: "Internal server error"})
        }
    }
)


// route.put("/cancel",async(req,res) =>{
//     const _id = req.body._id;
//     const cancelreason = req.body.cancelreason;
//     const cancelOrder = await orderCollection.findOneAndUpdate({ _id }, {$set: {orderStatus:"Cancelled",cancelreason}})
//     return res.json(cancelOrder)
// })

route.put("/cancel", async (req, res) => {
  const orderId = req.body._id;
  const cancelreason = req.body.cancelreason;

  try {
      const cancelledOrder = await orderCollection.findOne({ _id: orderId });

      if (!cancelledOrder) {
          return res.status(404).json({ error: "Order not found" });
      }

      for (const orderProduct of cancelledOrder.orderproducts) {
          const productId = orderProduct.productId;
          const quantity = orderProduct.quantity;

          await productCollection.findByIdAndUpdate(
              productId,
              { $inc: { countStock: quantity } }
          );
      }

      const updatedOrder = await orderCollection.findOneAndUpdate(
          { _id: orderId },
          { $set: { orderStatus: "Cancelled", cancelreason } },
          { new: true } 
      );

      if (updatedOrder) {
          res.json(updatedOrder);
      } else {
          res.status(500).json({ error: "Failed to update order" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
});



//delete//
route.get("/deleteorder/:id",logauth, async (req, res) => {

      const orderId = req.params.id;
  
      try {
        const orderDelete = await orderCollection.findOne({ _id: orderId });
  
        if (orderDelete) {
          res.json(orderDelete);
        } else {
          res.status(404).json({ error: "order not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  
 
route.delete("/deleteorder", async (req, res) => {
    try {
      const orderId = req.body.id;
      await orderCollection.findByIdAndDelete(orderId);
      res.redirect(303, "/orderSummary");
    } catch (error) {
      res.send(error);
    }
  });



module.exports = route;