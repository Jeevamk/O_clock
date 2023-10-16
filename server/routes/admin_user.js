const express = require('express')
const route = express.Router()
const userCollection = require('../model/user_model')
const authenticateJWT = require('../middleware/auth')
const adminCollection = require('../model/admin_model')

route.use(express.json());

route.get('/', authenticateJWT, async (req, res) => {
    if (req.cookies.session) {
        const adminid = await adminCollection.findOne({ _id: req.adminId })
        const users = await userCollection.find()
        res.render('adminUser', { adminid, users })
        console.log(users);

    }
})


//get single data //

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
        res.status(500).json({ error: 'internal server error' })
    }

});


//update //

route.get('/edit/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const userUpdate = await userCollection.findOne({ _id: userId })

        if (userUpdate) {
            res.json(userUpdate);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    };

})


route.put('/edit/:id',authenticateJWT, async (req, res) => {
    const userId = req.params.id;
    const userUpdateData = req.body;
    try {
        const userUpdate = await userCollection.findByIdAndUpdate({ _id: userId }, { $set: userUpdateData })

        if (userUpdate) {
            res.redirect(303,'/adminhome/users')
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    };

})


//delete//

route.delete('/delete_user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await userCollection.findByIdAndDelete(userId);
        res.redirect(303, '/adminhome/users');
    }
    catch (error) {
        res.send(error);
    }
})










module.exports = route
