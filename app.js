const express=require('express');
const hbs = require('hbs');
const dotenv = require('dotenv').config({path:'config.env'});
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path')
const cookieParser = require('cookie-parser');
const { body , validationResult } =require ("express-validator");
const parserencoded = bodyparser.urlencoded({ extended: false });  
const expressHandlebars = require('express-handlebars');
                                                                                                                  


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
app.use('/adminhome/users',require('./server/routes/admin/admin_user'))
app.use('/adminhome/singleuser',require('./server/routes/admin/admin_singleuser'))
app.use('/adminhome/category',require ('./server/routes/admin/admin_category'))
app.use('/adminhome/brands',require('./server/routes/admin/admin_brand'))
app.use('/adminhome/products',require('./server/routes/admin/admin_products'))
app.use('/adminhome/order',require('./server/routes/admin/admin_order'))
app.use('/adminhome/banner',require('./server/routes/admin/admin_banner'))
app.use('/',require('./server/routes/user/user_router'))
app.use('/',require('./server/routes/user/auth_google'))
app.use('/shop',require('./server/routes/user/shop'))
app.use('/contact',require('./server/routes/user/contact'))
app.use('/wish',require('./server/routes/user/wishlist'))







app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})