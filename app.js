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

const createError = require("http-errors")


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
app.use('/adminhome/contact',require('./server/routes/admin/admin_contact'))
app.use('/adminhome/order',require('./server/routes/admin/admin_order'))
app.use('/adminhome/report',require('./server/routes/admin/report'))
app.use('/adminhome/coupon',require('./server/routes/admin/admin_coupon'))
app.use('/',require('./server/routes/user/user_router'))
app.use('/auth',require('./server/routes/user/auth_google'))
app.use('/shop',require('./server/routes/user/shop'))
app.use('/contact',require('./server/routes/user/contact'))
app.use('/wish',require('./server/routes/user/wishlist'))
app.use('/cart',require('./server/routes/user/cart'))
app.use('/checkout',require('./server/routes/user/checkout'))
app.use('/payment',require('./server/routes/user/payment'))
app.use('/orderplaced',require('./server/routes/user/orderPlaced'))
app.use('/ordersummary',require('./server/routes/user/orderSummary'))
app.use('/myaddress',require('./server/routes/user/myaddress'))
app.use('/about',require('./server/routes/user/about'))



app.use(function(req, res, next) {
    next(createError(404));
  });
  
  
  
  
  // error handler
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.render('404');
  });





app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})