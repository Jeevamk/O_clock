const express = require('express')
const route = express()
const adminCollection = require('../model/admin_model')

route.get('/',(req,res)=>{
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


route.get('/login',(req ,res) => {
    res.render('login');
})

route.post('/login_admin' , (req,res) => {
    


})

module.exports = route