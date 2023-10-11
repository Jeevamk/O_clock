const express = require('express')
const route = express.Router()
const userCollection = require('../model/user_model')
const authenticateJWT = require('../middleware/auth')
const adminCollection = require('../model/admin_model')



route.get('/', authenticateJWT, async (req, res) => {
    if (req.cookies.session) {
        const adminid =await adminCollection.findOne({ _id:req.adminId })
        const users = await userCollection.find()
        res.render('adminUser',{adminid,users})
        console.log(users);
    
    }    
})





module.exports = route
