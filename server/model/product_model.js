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
    // category :{
    //     type : String,
    //     default  :'',
    // },
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
    image : {
        type:Object,
        default:"",
    },
    images : [String],
    brand : {
        type : String,
        ref :'brandCollection',
        // default  :'',
    },
    color : {
        type : String,
        default :''
    },
    reviews : {
        type : Number,
        default : 0 ,
    },
    gender : {
        type : String ,
        required :true,
    },
    createdDate :{
        type : Date,
        default :Date.now,
    },
    countStock :{
        type : Number,
        default : 0,
    },
    material :{
        type : String,
        default : ''

    }

})


const productCollection = new mongoose.model('productCollection', productSchema);

module.exports = productCollection;