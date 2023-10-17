const express = require ('express');
const route = express.Router();
const {Category}= require('../model/category')

router.get ('/', async (req,res) => {
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success :false})
    }
    res.send (categoryList);
})


router.post('/' , async (req,res)=> {
    const category = new Category ({
        name : req.body.name,
        color :req.body.color
    })
    category = await category.save();

    if(!category) {
        return res.status(404).send('the category can not be created')
    }
})