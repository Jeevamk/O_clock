const mongoose = require('mongoose')

const checkoutSchema = mongoose.Schema ({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref :'userCollection',
    },
    name : {
        type : String,
        required :true,
    },
    phone : {
        type : String,
        required :true,

    },
    email : {
        type : String,
        required :true,

    },
    address : {
        type : String,
        required :true,

         
    },
    area : {
        type : String,
        required :true,


    },
    pincode : {
        type :Number,
        required :true,

    },
    city : {
        type : String,
        required :true,

    },
    state : {
        type : String,
        required :true,

    },
    optionaladdress : {
        type : String
    },
    couponId :{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'couponCollection'
    }


})

const checkoutCollection = new mongoose.model('checkoutCollection', checkoutSchema);

module.exports = checkoutCollection;