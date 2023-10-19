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
        price : req.body.price,

    })

})





module.exports = route