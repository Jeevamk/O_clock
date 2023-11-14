const mongoose = require('mongoose')

const orderSchema = mongoose.Schema ({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref :'userCollection',
       
    },
    productId: {
        type :mongoose.Schema.Types.ObjectId,
        ref :'productCollection',
       
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