const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    category : {
        type :String,
        ref :'categoryCollection',
       
    },
    description1 : {
        type :String,
        required :true,
    },
    description2 : {
        type :String,
        default: '',
    },
    price : {
        type :Number,
        default : 0,
    },
   
    images :{
        type : String,
    },
    Imageone :{
        type : String,
    },
    Imagetwo :{
        type : String,
    },
    Imagethree :{
        type : String,
    },
    brand : {
        type : String,
        ref :'brandCollection',
        // default  :'',
    },
    color : {
        type : String,
        default :''
    },
    gender : {
        type : String ,
        required :true,
    },
    createdDate :{
        type : Date,
        default :Date.now,
        // timestamps: true,
    },
    countStock :{
        type : Number,
        default : 0,
    },
    material :{
        type : String,
        default : ''

    },
    
})


const productCollection = new mongoose.model('productCollection', productSchema);

module.exports = productCollection;