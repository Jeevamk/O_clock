const express = require('express')
const route = express()
const adminCollection = require('../model/admin_model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.secretKey

route.get('/', (req, res) => {
    res.render('index')
})

// route.get('/signup',(req,res) =>{
//     res.render('signup')
// })

// route.post('/login_admin',async (req,res)=>{
//     try {
//         const password = req.body.password;
//         const cpassword = req.body.cpassword;

//         if (password === cpassword) {
//             const adminData = new adminCollection({
//                 name: req.body.name,
//                 email: req.body.email,
//                 phone: req.body.phone,
//                 password: req.body.password,
//                 cpassword: req.body.cpassword
//             })

//             const postData = await adminData.save();
//             res.render("login")

//         } else {
//             res.render('signup')
//             res.status(400);
//         }
//     }
//     catch (error) {
//         console.error('Error:',error);
//     }
// })


route.get('/login', (req, res) => {
    res.render('login');
})

route.post('/login_admin', async (req, res) => {
    try {
        const { email, loginpassword } = req.body;
        const Useremail = await adminCollection.findOne({ email });

        if (!Useremail) {
            return res.render('login', { show: true });
        }
        const passMatch = await bcrypt.compare(loginpassword, Useremail.password);
        if (!passMatch) return res.status("401").render('login', { alert: true })
        const token = jwt.sign({ userId: Useremail._id }, secret)
        return res.cookie('session', token).render('index')
    }



    catch (err) {
        res.send(err);
    }
})

module.exports = route