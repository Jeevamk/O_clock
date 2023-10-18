const express = require('express')
const route = express.Router()
const brandCollection= require('../model/brand_model')
const authenticateJWT = require ('../middleware/auth')
const adminCollection = require('../model/admin_model')

route.use(express.json());

route.get('/',authenticateJWT,async (req,res)=>{
    if(req.cookies.session) {
        const adminid = await adminCollection.findOne({ _id: req.adminId });
        const brands = await brandCollection.find()
        res.render('adminBrand',{ adminid,brands})
    }else {
        res.redirect('/adminhome')
    }

})

//add brand//
route.post('/' , async (req,res)=> {
    const brand = new brandCollection ({
        name : req.body.name,
        description : req.body.description,
       
    })
    brand == await brand.save();
    
    if(!brand) {
        return res.status(404).send('the brand can not be created')
    }else {
        return res.redirect('/adminhome/brands')
    }
})










module.exports = route