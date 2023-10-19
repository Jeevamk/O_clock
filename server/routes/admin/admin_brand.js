const express = require('express')
const route = express.Router()
const brandCollection= require('../../model/brand_model')
const authenticateJWT = require ('../../middleware/auth')
const adminCollection = require('../../model/admin_model')
const multer = require('multer')

const storage = multer.diskStorage ({
    destination : function (req ,file ,cb ){
        return cb(null,"./assets/images/uploads");
    },
    filename  :function (req, file ,cb) {
       return cb (null,`${Date.now()}-${file.originalname}`);
    },
})

const upload = multer ({storage })
// const upload = multer ( {dest : "assets/images/uploads"})

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
route.post('/' ,upload.single ('logo'), async (req,res)=> {
    const brand = new brandCollection ({
        name : req.body.name,
        description : req.body.description,
        logo : {
            data:req.file.filename,
            contentType : 'image/jpg'
        }
       
    })
    brand == await brand.save();
    
    if(!brand) {
        return res.status(404).send('the brand can not be created')
    }else {
        return res.redirect('/adminhome/brands')
    }
})


//view single data//

route.get('/:id', async (req, res) => {
    if(req.cookies.session) {

    const brandId = req.params.id;

    try {
        const brand = await brandCollection.findOne({ _id: brandId });
        if (brand) {
            res.json(brand);
        } else {
            res.status(404).json({ error: 'brand not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' })
    }
}else {
    res.redirect('/adminhome')
}

});

//edit//
route.get('/update/:id',async (req,res)=> { 
    if(req.cookies.session) {

    const brandId = req.params.id;
    
    try{
        const brandUpdate = await brandCollection.findOne({_id: brandId })

        if (brandUpdate) {
            res.json(brandUpdate)
        } else{
            res.status(404).json({error:"brand not found"});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
}else {
    res.redirect('/adminhome')
}
})

route.put('/update',authenticateJWT, async (req, res) => {

    const brandid = req.body.id;
    const brandUpdateData = req.body;
    try {
        const brandUpdate = await brandCollection.findByIdAndUpdate({ _id: brandid }, { $set: brandUpdateData })

        if (brandUpdate) {
            res.redirect(303,'/adminhome/brands')
        } else {
            res.status(404).json({ error: 'brand not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    };

})


//delete//

route.delete('/delete_brand/:id', async (req, res) => {
    try {
        const brandId = req.params.id;
        await brandCollection.findByIdAndDelete(brandId);
        res.redirect(303, '/adminhome/brands');
    }
    catch (error) {
        res.send(error);
    }
})










module.exports = route