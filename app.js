const express=require('express');
const hbs = require('hbs')
const dotenv = require('dotenv').config({path:'config.env'});
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path')



const app = express();
const PORT =process.env.PORT|| 9000 ;

//log request
app.use(morgan('tiny'))

//parse request to body parser
app.use(bodyparser.urlencoded({extended:true}))

//view engine
app.set('view engine','hbs');
// app.set("views",path.resolve(__dirname,"views/hbs"))

require('./server/database/db');

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/images',express.static(path.resolve(__dirname,"assets/images")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/',require('./server/routes/router'))
app.use('/login_admin',require('./server/routes/router'))




app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})