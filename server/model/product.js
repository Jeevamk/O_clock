const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    category : {
        type :mongoose.Schema.Types.ObjectId,
        ref :'Category',
        required : true,
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
    image : {
        type : String,
        default : ''
    },
    images : [{
        type : String,
        default: '',
    }],
    brand : {
        type : String,
        default  :'',
    },
    productStock :{
        type : Number,
        required :true,
        min : 0,
        max: 200,
    },
    reviews : {
        type : Number,
        default : 0 ,
    },

})

exports.Product = mongoose.model('Product', productSchema);