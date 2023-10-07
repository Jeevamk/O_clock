const express = require('express')
const route = express.Router()
const adminCollection = require('../model/admin_model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.secretKey
const authenticateJWT = require('../middleware/auth')

route.get('/', (req, res) => {
    if(!req.cookies.session) return res.redirect('/adminhome/login') 
    res.render('admin_home')
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


route.get('/login',(req, res) => {
    const key = req.cookies.session;
    if (key) {
        res.render('admin_home')
    }else{
        res.render('login');
    }  
})
//login post//
route.post('/login_admin', async (req, res) => {
    try {
        const { email, loginpassword } = req.body;
        const adminemail = await adminCollection.findOne({ email });

        if (!adminemail) {
            return res.render('login', { show: true });
        }
        const passMatch = await bcrypt.compare(loginpassword, adminemail.password);
        if (!passMatch) return res.status(401).render('login', { alert: true })
        const token = jwt.sign({ adminId: adminemail._id }, secret)
        return res.cookie('session', token).redirect('/adminhome')
    }
    catch (err) {
        res.send(err);
    }
})

//edit//
route.get('/')


route.get('/products',authenticateJWT,(req,res)=>{
    res.render('products')
})




module.exports = route