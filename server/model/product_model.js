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
    }

})


const productCollection = new mongoose.model('productCollection', productSchema);

module.exports = productCollection;