const express=require('express');
const hbs = require('hbs');
const dotenv = require('dotenv').config({path:'config.env'});
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path')
const cookieParser = require('cookie-parser');
const { body , validationResult } =require ("express-validator");
const parserencoded = bodyparser.urlencoded({ extended: false });  
const fileUpload = require("express-fileupload");
                                                                                                                  


const app = express();
const PORT =process.env.PORT|| 9000 ;

//log request
app.use(morgan('tiny'))

//parse request to body parser
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))

// app.use(fileUpload({
//     useTempFiles: true
//   }))
  

//view engine
app.set('view engine','hbs');
// app.set("views",path.resolve(__dirname,"views/hbs"))

require('./server/database/db');

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/images',express.static(path.resolve(__dirname,"assets/images")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/adminhome',require('./server/routes/admin/router'))
app.use('/',require('./server/routes/user/user_router'))
app.use('/adminhome/users',require('./server/routes/admin/admin_user'))
app.use('/adminhome/category',require ('./server/routes/admin/admin_category'))
app.use('/adminhome/brands',require('./server/routes/admin/admin_brand'))
app.use('/adminhome/products',require('./server/routes/admin/admin_products'))




app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})