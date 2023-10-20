const express = require ('express')
const route = express.Router()
const productCollection = require('../../model/product_model')
const adminCollection = require('../../model/admin_model')
const authenticateJWT = require ('../../middleware/auth')
const multer = require('multer')

const storage = multer.diskStorage ({
    destination : function (req ,file ,cb ){
        return cb(null,"./assets/images/products");
    },
    filename  :function (req, file ,cb) {
       return cb (null,`${Date.now()}-${file.originalname}`);
    },
})


route.use(express.json())


route.get('/',authenticateJWT, async (req,res) =>{
    if(req.cookies.session){
        const adminid = await adminCollection.findOne({ _id : req.adminId })
        const products = await productCollection.find()
        res.render('adminProducts' , { adminid,products })

    }else {
        res.redirect('/adminhome')
    }
   
})

route.post('/',async (req,res)=>{
    const product = new productCollection ({
        name : req.body.name,
        description1  :req.body.description1,
        description2 : req.body.description2,
        price : req.body.price,
        category : req.body.category,
        image : req.body.image,
        images  : req.body.images,
        brand : req.body.brand,
        color : req.body.color,
        reviews : req.body.reviews,
        gender : req.body.gender,
        createdDate :req.body.createdDate,
        countStock : req.body.countStock,
    })
    product == await product.save();

    if(!product) {
        return res.status(404).send("product is not created")
    }else {
        return res.redirect('/adminhome/products')
    }

})





module.exports = route