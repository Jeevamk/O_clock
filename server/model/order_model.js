const mongoose = require('mongoose')

const orderSchema = mongoose.Schema ({
    name :{
        type : String,
        required : true
    },
    date : {
        type : Date,
    },
    paymentMethod : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        required : true
    },
})

const orderCollection = new mongoose.model( 'orderCollection', orderSchema )

module.exports = orderCollection ;