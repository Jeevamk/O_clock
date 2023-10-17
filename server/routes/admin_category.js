const express = require('express')
const route = express.Router()
const categoryCollection = require('../model/category_model')
const authenticateJWT = require('../middleware/auth')
const adminCollection = require('../model/admin_model')

route.use(express.json());

route.get ('/',authenticateJWT, async (req,res) => {
    if(req.cookies.session){
        const adminid = await adminCollection.findOne({ _id: req.adminId });
        const categoryList = await categoryCollection.find();
        res.render('adminCategory', { adminid, categoryList })
    }
    
})



route.post('/' , async (req,res)=> {
    const category = new categoryCollection ({
        name : req.body.name,
        description : req.body.description,
        availableStock : req.body.availableStock,
    })
    category == await category.save();
    
    if(!category) {
        return res.status(404).send('the category can not be created')
    }else {
        return res.redirect('/adminhome/category')
    }
})
















module.exports = route 