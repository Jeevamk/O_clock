const express = require('express');
const route = express.Router();
const orderCollection = require ('../../model/order_model');
const authenticateJWT = require ('../../middleware/auth');
const adminCollection = require("../../model/admin_model");
const userCollection = require("../../model/user_model")
const productCollection = require("../../model/product_model")
const checkoutCollection = require("../../model/checkout_model")
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config({path:'config.env'});
const { format } = require("date-fns")


async function orderMail(name,email,orderStatus,date) {

  const trasnporter = nodemailer.createTransport({
    service: "Gmail",
    
    auth: {
      user: "jeevamk100@gmail.com",
      pass: "hexg nlyg mvit mqnt",
    },
  });

  const mailOption = {
    from :"jeevamk100@gmail.com",
    to: email,
    subject:"About the order Status",
    html:`Hii ${name}, Your Order from the O|o' Clock is ${orderStatus}  at ${date}...`,
  };
  try{
    await trasnporter.sendMail(mailOption);
    return Promise.resolve("Message sent Successfully!");

  }catch(err){
    return Promise.reject(err);
  }

}


route.use(express.json());

route.get ('/',authenticateJWT,async (req,res)=>{ 
    if(req.cookies.session) {
        const adminid = await adminCollection.findOne({ _id: req.adminId });
        const orderList = await orderCollection.find();
        console.log("orderlist",orderList);

        const userDetails = [];
        for (let order of orderList) {
            const user  = await userCollection.findOne({_id:order.userId})
            const userName = user.name;
            order.userName = userName;
            
            userDetails.push(user,userName)

            console.log("user",userDetails);
        }
        res.render('adminOrder', { adminid , orderList,userDetails });

    }else {
        res.redirect("/adminhome");
    }
})


route.get('/:id', authenticateJWT,async(req,res) =>{ 
    if (req.cookies.session) {
        const adminid = await adminCollection.findOne({ _id: req.adminId });
        const id = req.params.id;

        try {
            const orders = await  orderCollection.findOne({_id:id});
            const userDetails = await userCollection.findById(orders.userId)
            const addressDetails = await checkoutCollection.findOne({_id : orders.addressId})
            const orderproducts = orders.orderproducts;
            console.log("orderproducts:",orderproducts)
            const productDetails = [];
            for (let product of orderproducts) {
                const productItem = await productCollection.findById(product.productId)
                const quantity = product.quantity
                console.log(quantity)
                productDetails.push({productItem , quantity})
            }

            res.render("admin_singleOrder",{adminid,orders,userDetails , addressDetails ,productDetails })
        }catch(error){
            res.status(500).json({ error: "Internal server error" });
        }

    }
})



//update order status//
route.get('/update/:id', async(req,res) =>{
    if (req.cookies.session) {
        const id = req.params.id;

        try {
            const order = await orderCollection.findOne({_id : id})

            if(order) {
                return res.json(order)
            }else {
                res.status(404).json({error : "Order not found"})
            }

        } catch (error) {
            res.status(500).json({error: "Internal server error"})
        }
    }else{
        return res.redirect("/adminhome");
    }
})


route.put("/update",async(req,res) =>{
    const _id = req.body._id;
    const orderStatus = req.body.orderStatus;
    const updateOrder = await orderCollection.findOneAndUpdate({ _id }, {$set: {orderStatus}},{new : true})
    console.log("updateorder",updateOrder);
    
    const addressDetails = await checkoutCollection.findOne({_id :updateOrder.addressId})
    const email = addressDetails.email;
    console.log("email:",email);
    const username = addressDetails.name;
    const date = new Date().toLocaleString();
    await orderMail(username,email,orderStatus,date)
    return res.json(updateOrder)
})



// //delete//
// route.get("/delete_order/:id", async (req, res) => {
//     if (req.cookies.session) {
//       const orderId = req.params.id;
  
//       try {
//         const orderDelete = await orderCollection.findOne({ _id: orderId });
  
//         if (orderDelete) {
//           res.json(orderDelete);
//         } else {
//           res.status(404).json({ error: "order not found" });
//         }
//       } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal server error" });
//       }
//     } else {
//       res.redirect("/adminhome");
//     }
//   });
  
 
// route.delete("/delete_order", async (req, res) => {
//     try {
//       const orderId = req.body.id;
//       await orderCollection.findByIdAndDelete(orderId);
//       res.redirect(303, "/adminhome/order");
//     } catch (error) {
//       res.send(error);
//     }
//   });



module.exports = route