const express = require('express')
const route = express.Router()
const userCollection = require('../model/user_model')
const authenticateJWT = require('../middleware/auth')
const adminCollection = require('../model/admin_model')

route.use(express.json());

route.get('/', authenticateJWT, async (req, res) => {
    if (req.cookies.session) {
        const adminid =await adminCollection.findOne({ _id:req.adminId })
        const users = await userCollection.find()
        res.render('adminUser',{adminid,users})
        console.log(users);
    
    }    
})



route.get('/:id', async (req, res) => {
    const userId = req.params.id; 
    
    try {
        const user = await userCollection.findOne({ _id: userId });
        if (user) {
            res.json(user); 
        } else {
            res.status(404).json({ error: 'User not found' }); 
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server error'})
    }
    
   
});










module.exports = route
